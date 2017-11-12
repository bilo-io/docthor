const githubRoute = 'https://raw.githubusercontent.com/bilo-io'
const fedRoute = 'tut-react'
const config = [
    {
        label: 'Frontend',
        children: [
            {
                label: 'fed',
                link: `${githubRoute}/tut-fed/master/README.md`
            },
            {
                label: 'react',
                link: `${githubRoute}/tut-react/master/README.md`
            },
        ]
    },
    {
        label: 'Projects',
        children: [
            {
                label: 'ui',
                link: `${githubRoute}/bilo-ui/master/README.md`
            },
            {
                label: 'cli',
                link: `${githubRoute}/bilo-cli/master/README.md`
            },
        ]
    }
]

export default config;