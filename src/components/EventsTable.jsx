import React from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

class EventsTable extends React.Component {

    state = {
        items: Array.from({ length: 20 }),
        hasMore: true
    };

    fetchMoreData = () => {
        /*
        let resultValue = fetch('http://localhost:8081/aknms/v1/event/')
        .then(result => result.json());
        console.log(resultValue);
        this.setState({
            items: this.state.items.concat(resultValue)
        });
        */

        if (this.state.items.length >= 500) {
            this.setState({ hasMore: false });
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({ length: 20 }))
            });
        }, 500);
    };

    render() {
        return (
            <div>
                <h1>demo: react-infinite-scroll-component</h1>
                <hr />
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    height={800}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.items.map((i, index) => (
                        <div style={style} key={index}>
                            {index}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}

export default EventsTable;
