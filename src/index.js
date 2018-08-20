import _ from "lodash";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from "youtube-api-v3-search";
import SearchBar from './components/search_bar';
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const API_KEY = 'AIzaSyBsfcuHgLvDbJqrld0aYZihJtjMWZePylI';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("surfboards");
    }

    videoSearch(term) {
        const options = {
            q: term,
            part: 'snippet',
            type: 'video'
        }

        YTSearch(API_KEY, options, (error, response) => {
            if (error) {
                alert(error);
            }

            this.setState({
                videos: response.items,
                selectedVideo: response.items[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={term => videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={ selectedVideo => this.setState({ selectedVideo }) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
