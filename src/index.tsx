import React from 'react';
import { render, Box, Text } from 'ink';

const App = () => {
  return (
    <Box flexDirection="row" height="100%">
      {/* Left panel: Tree view */}
      <Box
        width={30}
        borderStyle="round"
        borderColor="cyan"
        padding={1}
        flexDirection="column"
      >
        <Text color="cyan">Tree View</Text>
      </Box>

      {/* Right panel: File view */}
      <Box
        flexGrow={1}
        borderStyle="round"
        borderColor="green"
        padding={1}
        flexDirection="column"
      >
        <Text color="green">File View</Text>
      </Box>
    </Box>
  );
};

render(<App />);
