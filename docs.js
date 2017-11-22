exports.config = {
    base_url: `https://github.com/bilo-io/`,
    children: [
        {
            repo: 'bilo-cli',
            name: 'Bilo CLI',
            docs: '.docs'
        },
        {
            repo: 'react-browser-support',
            name: 'React Browser Support',
            docs: 'docs'
        }
    ]
}