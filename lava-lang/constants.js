const inlineComment = '%%';
const LAVA_CONSTANTS = {
	inlineLava: {
		startInlineLava: inlineComment + '|',
		endInlineLava: '|' + inlineComment,
		lifecycleSymbol: '->',
		parameterNamespace: 'params'
	},

	lavaFile: {
		extention: '.lava',
		inlineStart: inlineComment + '!',
		inlineEnd: '!' + inlineComment
	}
};
Object.freeze(LAVA_CONSTANTS);

export default LAVA_CONSTANTS;
