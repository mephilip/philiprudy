var Posts = React.createClass({
    getInitialState: function () {
        return {
            id: '',
            title: '',
            body: ''
        };
    },
    componentDidMount: function () {
        this.serverRequest = $.get(this.props.source, function (result) {
            var lastPost = result[0];
            this.setState({
                id: lastPost.id,
                date: lastPost.date,
                slug: lastPost.slug,
                type: lastPost.type.constructor,
                link: lastPost.link,
                title: lastPost.title.rendered,
                content: lastPost.content.rendered,
                excerpt: lastPost.excerpt.rendered,
                author: lastPost.author
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {
        return (
            <div className="post">
                <div className="post-title">
                    {this.state.title}
                </div>
                <div className="post-content">
                    {this.state.content}
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <Posts source="http://localhost:8888/philiprudy/wp-json/wp/v2/posts" />,
    document.getElementById('portfolio')
);