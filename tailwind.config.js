module.exports = {
    theme: {
        extend: {
            backdropBlur: {
                '[16px]': '16px',
            },
            scrollbar: {
                none: 'none',
            },
        },
    },
    plugins: [
        require( 'tailwindcss' ),
        require( 'autoprefixer' ),
        function ( { addUtilities } ) {
            addUtilities( {
                '.scrollbar-thin': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': '#6b7280 #f1f1f1',
                },
                '.scrollbar-thumb-gray': {
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        'border-radius': '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(to bottom, #d1d5db, #6b7280)',
                        'border-radius': '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'linear-gradient(to bottom, #9ca3af, #4b5563)',
                    },
                },
            } );
        },
    ],
};