import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useStdout, useApp, useWindowSize } from 'ink';
import { ScrollBox } from './components/scrollbox/index.js';

const App = () => {
	const { exit: inkExit } = useApp();
	const [exit, setExit] = useState(false);
  	const {rows, columns} = useWindowSize();

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


	return (
		<Box flexDirection="row" width={columns} height={rows}>
			<Box
				width={30}
				height={rows}
				borderStyle="round"
				borderColor="cyan"
				flexDirection="column"
			>
				<Text color="cyan">Tree View</Text>
			</Box>

			<ScrollBox
				width={columns - 30}
				height={rows}
				lines={content} />
		</Box>
	);
};

const { waitUntilExit } = render(<App />, { alternateScreen: true });

waitUntilExit().then(() => {
	//process.stdout.write('\x1b[?1049l');
});
