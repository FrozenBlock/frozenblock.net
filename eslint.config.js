const js = require('@eslint/js');

module.exports = [
    {
        ignores: ['node_modules/**', 'assets/**', '.idea/**', 'out/**', 'build/**', 'kotlin-js-store/**']
    },
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                window: 'readonly',
                document: 'readonly',
                fetch: 'readonly',
                URLSearchParams: 'readonly',
                navigator: 'readonly',
                setTimeout: 'readonly',
                console: 'readonly',
                marked: 'readonly',
                hljs: 'readonly',
                mods: 'writable',
                colors: 'writable'
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-undef': 'off',
            'no-unused-vars': ['warn', { args: 'none' }]
        }
    }
];

