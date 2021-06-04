const initialState = {
    logs: [
        {
            id: '1',
            title: 'Lorem Ipsum Log 1',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat sapien eu pretium viverra. Vestibulum ante ipsum primis in faucibus orci luctus',
            tasks: [
                {
                    id: '1',
                    title: 'Lorem Ipsum Task 1',
                    priority: 2,
                    completed: true
                },
                {
                    id: '2',
                    title: 'Lorem Ipsum Task 2',
                    priority: 1,
                    completed: false
                },
                {
                    id: '3',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
            ]
        },
        {
            id: '2',
            title: 'Lorem Ipsum Log 2',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat sapien eu pretium viverra. Vestibulum ante ipsum primis in faucibus orci luctus',
            tasks: [
                {
                    id: '1',
                    title: 'Lorem Ipsum Task 1',
                    priority: 2,
                    completed: false
                },
                {
                    id: '2',
                    title: 'Lorem Ipsum Task 2',
                    priority: 1,
                    completed: false
                },
                {
                    id: '3',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
                {
                    id: '4',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
            ]
        },
        {
            id: '3',
            title: 'Lorem Ipsum Log 3',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat sapien eu pretium viverra. Vestibulum ante ipsum primis in faucibus orci luctus',
            tasks: [
                {
                    id: '1',
                    title: 'Lorem Ipsum Task 1',
                    priority: 2,
                    completed: false
                },
                {
                    id: '2',
                    title: 'Lorem Ipsum Task 2',
                    priority: 1,
                    completed: false
                },
                {
                    id: '3',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
                {
                    id: '4',
                    title: 'Lorem Ipsum Task 4',
                    priority: 2,
                    completed: true
                },
                {
                    id: '5',
                    title: 'Lorem Ipsum Task 5',
                    priority: 2,
                    completed: true
                },
            ]
        },
        {
            id: '6',
            title: 'Lorem Ipsum Log 1',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat sapien eu pretium viverra. Vestibulum ante ipsum primis in faucibus orci luctus',
            tasks: [
                {
                    id: '1',
                    title: 'Lorem Ipsum Task 1',
                    priority: 2,
                    completed: false
                },
                {
                    id: '2',
                    title: 'Lorem Ipsum Task 2',
                    priority: 1,
                    completed: false
                },
                {
                    id: '3',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
            ]
        },
        {
            id: '7',
            title: 'Lorem Ipsum Log 1',
            note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat sapien eu pretium viverra. Vestibulum ante ipsum primis in faucibus orci luctus',
            tasks: [
                {
                    id: '1',
                    title: 'Lorem Ipsum Task 1',
                    priority: 2,
                    completed: false
                },
                {
                    id: '2',
                    title: 'Lorem Ipsum Task 2',
                    priority: 1,
                    completed: false
                },
                {
                    id: '3',
                    title: 'Lorem Ipsum Task 3',
                    priority: 2,
                    completed: true
                },
            ]
        },
    ]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default reducer;