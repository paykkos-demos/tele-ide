import React, { useEffect, useState } from 'react';
import { render, Box, Text, useStdout, useInput, useApp } from 'ink';
import process from 'process';

const App = () => {
	const [exit, setExit] = useState(false);
	const { stdout } = useStdout();
	const { exit: inkExit } = useApp();
	const { columns, rows } = stdout;

	useInput((input, key) => {
		// Handle Ctrl+C manually
		if (key.ctrl && input === 'c') {
			setExit(true);
		}
	});

	useEffect(() => {
		if (exit) {
			inkExit(); // Exits Ink app cleanly
		}
	}, [exit]);

  process.stdout.write('\x1b[2J\x1b[0f'); // Clear screen + move cursor to top-left
  
	return (
	<Box flexDirection="column" width={columns} height={rows - 1}>
			{/* Background filler */}
			<Box
				position="absolute"
				width={columns}
				height={rows}
				backgroundColor="black"
			>
				{/* This box fills the screen */}
				<Text color="black">{' '.repeat(columns * (rows - 1))}</Text>
			</Box>

			{/* Foreground layout */}
			<Box flexDirection="row" flexGrow={1} width="100%" height="100%">
				{/* Left Panel */}
				<Box
					width={30}
					borderStyle="round"
					borderColor="cyan"
					padding={1}
					flexDirection="column"
				>
					<Text color="cyan">Tree View</Text>
				</Box>

				{/* Right Panel */}
				<Box
					flexGrow={1}
					borderStyle="round"
					borderColor="green"
					padding={1}
					flexDirection="column"
				>
					<Text color="green">File View</Text>
					<Text dimColor>Press "q" to quit</Text>
					<Text>
						Terminal: {columns} x {rows}
					</Text>
				</Box>
			</Box>
		</Box>
	);
};

const { waitUntilExit } = render(<App />);

waitUntilExit().then(() => {
	process.stdout.write('\x1b[2J\x1b[0f'); // Clear screen again on exit
});