import React from 'react';
import { render, Box, Text, useStdout } from 'ink';

const App = () => {
	const { stdout } = useStdout();

	return (
		<Box flexDirection="row" flexGrow={1} height="100%">
			<Box
				width={30}
				minHeight={0}
				borderStyle="round"
				borderColor="cyan"
				padding={1}
				flexDirection="column"
			>
				<Text color="cyan">Tree View</Text>
			</Box>

			<Box
				flexGrow={1}
				borderStyle="round"
				borderColor="green"
				padding={1}
				flexDirection="column"
			>
				<Text color="green">File View</Text>
				<Text>
					Terminal size: {stdout.columns}x{stdout.rows}
				</Text>
			</Box>
		</Box>
	);
};

render(<App />);
