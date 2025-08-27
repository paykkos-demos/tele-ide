import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export const ScrollBox = ({ lines, width, height }: { lines: string[]; width: number; height: number }) => {
	const [scrollY, setScrollY] = useState(0);
	const innerHeight = height - 2;
	
	useInput((_, key) => {
		if (key.downArrow) {
			setScrollY(y => Math.min(y + 1, lines.length - innerHeight));
		}
		if (key.upArrow) {
			setScrollY(y => Math.max(y - 1, 0));
		}
	});

	const visibleLines = lines.slice(scrollY, scrollY + innerHeight);

	return (
		<Box flexGrow={1}
            borderStyle="round"
            borderColor="green"
			width={width}
			height={height}
			flexDirection="column">
				{visibleLines.map((line, i) => (
					<Text key={i}>{line}</Text>
				))}
		</Box>
	);
};
