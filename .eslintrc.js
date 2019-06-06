module.exports = {
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:vue/recommended'
	],
	plugins: [
		'@typescript-eslint'
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		'sourceType': 'module',
		'parser': '@typescript-eslint/parser',
	},
	rules: {

	}
};