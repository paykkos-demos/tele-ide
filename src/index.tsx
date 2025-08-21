import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useStdout, useApp } from 'ink';

const DEBOUNCE_DELAY = 100; // ms

const App = () => {
	const { stdout } = useStdout();
	const { exit: inkExit } = useApp();
	const [exit, setExit] = useState(false);
	const [size, setSize] = useState({ columns: stdout.columns, rows: stdout.rows });

	useInput((input, key) => {
		if (input === 'q' || (key.ctrl && input === 'c')) {
			setExit(true);
		}
	});

	useEffect(() => {
		if (exit) {
			inkExit();
		}
	}, [exit]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const onResize = () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				setSize({ columns: stdout.columns, rows: stdout.rows });
			}, DEBOUNCE_DELAY);
		};

		stdout.on('resize', onResize);

		// Cleanup
		return () => {
			if (timeout) clearTimeout(timeout);
			stdout.off('resize', onResize);
		};
	}, [stdout]);

	const { columns, rows } = size;
  const rowsWithSpace = rows - 1;

  process.stdout.write('\x1b[?1049h');

	return (
		<Box flexDirection="column" width={columns} height={rowsWithSpace}>
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
					<Text dimColor>Press "q" or Ctrl+C to quit</Text>
					<Text>Terminal: {columns} x {rowsWithSpace}</Text>
				</Box>
			</Box>
		</Box>
	);
};

const { waitUntilExit } = render(<App />);

waitUntilExit().then(() => {
	process.stdout.write('\x1b[?1049l');
});