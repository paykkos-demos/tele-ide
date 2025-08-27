import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useStdout, useApp } from 'ink';
import { ScrollBox } from './components/scrollbox/index.js';

const App = () => {
	const { stdout } = useStdout();
	const { exit: inkExit } = useApp();
	const [exit, setExit] = useState(false);
	const [size, setSize] = useState({ columns: stdout.columns, rows: stdout.rows });

	const content = Array.from({ length: 500 }, (_, i) => `Line ${i}`);

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
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => {
				setSize({ columns: stdout.columns, rows: stdout.rows });
			}, 1);
		};

		stdout.on('resize', onResize);

		// Cleanup
		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
			stdout.off('resize', onResize);
		};
	}, [stdout]);

	const { columns, rows } = size;
	const rowsWithSpace = rows - 1;

	process.stdout.write('\x1b[?1049h');

	return (
		<Box flexDirection="row" width={columns} height={rowsWithSpace}>
			<Box
				width={30}
				height={rowsWithSpace}
				borderStyle="round"
				borderColor="cyan"
				flexDirection="column"
			>
				<Text color="cyan">Tree View</Text>
			</Box>

			<ScrollBox
				width={columns - 30}
				height={rowsWithSpace}
				lines={content} />
		</Box>
	);
};

const { waitUntilExit } = render(<App />);

waitUntilExit().then(() => {
	process.stdout.write('\x1b[?1049l');
});