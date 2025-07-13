import { Component, type ChangeEventHandler } from 'react';
import { SearchControls } from './components/search-controls';
import {
  getRickMortyCharacterByName,
  type IRickMortyResponse,
} from './services/rick-morty';
import { Results } from './components/results';
import { LOCALSTORAGE_SEARCH_QUERY_KEY, PROMISE_STATUS } from './constants';
import type { T_PROMISE_STATUS } from './types';

interface IAppState {
  searchInput: string;
  status: T_PROMISE_STATUS | null;
  data: IRickMortyResponse | string | null;
}

export class App extends Component<unknown, IAppState> {
  state: IAppState = {
    searchInput:
      window.localStorage.getItem(LOCALSTORAGE_SEARCH_QUERY_KEY) ?? '',
    status: null,
    data: null,
  };

  abortController: AbortController | null = null;
  previousSeachQuery: string | null = null;

  handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  handleSearch = () => {
    const searchQuery = this.state.searchInput.trim();

    if (searchQuery === this.previousSeachQuery) {
      return;
    }

    this.previousSeachQuery = searchQuery;
    window.localStorage.setItem(LOCALSTORAGE_SEARCH_QUERY_KEY, searchQuery);
    this.getData(searchQuery);
  };

  getData = (searchQuery: string) => {
    const [requestPromise, abortController] =
      getRickMortyCharacterByName(searchQuery);

    this.abortController = abortController;

    this.setState({ status: PROMISE_STATUS.PENDING });

    requestPromise.then((response) => {
      if (response.success) {
        this.setState({
          status: PROMISE_STATUS.FULFILLED,
          data: response.data,
        });
      } else {
        this.setState({ status: PROMISE_STATUS.REJECTED, data: response.data });
      }
    });
  };

  componentDidMount() {
    this.getData(this.state.searchInput);
  }

  componentWillUnmount() {
    this.abortController?.abort();
  }

  render() {
    return (
      <main className="container section">
        <SearchControls
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          value={this.state.searchInput}
          isLoading={this.state.status === PROMISE_STATUS.PENDING}
        />

        <Results status={this.state.status} data={this.state.data} />
      </main>
    );
  }
}
