import React, { useEffect, useReducer } from 'react';
import ReactPaginate from 'react-paginate';
import '../App.css';
import Header from './Header';
import Product from './Product';
import Search from './Search';
import { initialState, reducer } from '../store/reducer';

const SEARCHSPRING_API_URL = `https://scmq7n.a.searchspring.io/api/search/search.json?resultsFormat=native&siteId=scmq7n`;

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		products,
		errorMessage,
		loading,
		pageCount,
		currentPage,
		currentSearch,
	} = state;

	useEffect(() => {
		fetch(SEARCHSPRING_API_URL)
			.then((response) => response.json())
			.then((jsonResponse) => {
				dispatch({
					type: 'SEARCH_PRODUCTS_SUCCESS',
					payload: jsonResponse,
				});
			});
	}, []);

	const search = (searchValue) => {
		dispatch({
			type: 'SEARCH_PRODUCTS_REQUEST',
			currentSearch: searchValue,
		});

		let search_request_url = `https://scmq7n.a.searchspring.io/api/search/search.json?q=${searchValue}&resultsFormat=native&siteId=scmq7n`;
		
		call_api(search_request_url);
	};

	const handlePageChange = (selectedObject) => {
		let page_change_url = `https://scmq7n.a.searchspring.io/api/search/search.json?q=${currentSearch}&resultsFormat=native&page=${
			selectedObject.selected + 1
		}&siteId=scmq7n`;

		call_api(page_change_url);
	};

	const call_api = (url) => {
		fetch(url)
			.then((response) => response.json())
			.then((jsonResponse) => {
				if (jsonResponse.pagination.totalPages > 0) {
					dispatch({
						type: 'SEARCH_PRODUCTS_SUCCESS',
						payload: jsonResponse,
					});
				} else {
					dispatch({
						type: 'SEARCH_PRODUCTS_FAILURE',
						error: jsonResponse.Error,
					});
				}
			});
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};


	return (
		<div className='App'>
			<Header text='Searchspring Technical Challenge' />
			<Search search={search} />
			<h3>Search Results</h3>
			<div>
				<ReactPaginate
					pageCount={pageCount}
					pageRangeDisplayed={2}
					marginPagesDisplayed={1}
					disableInitialCallback={true}
					forcePage={currentPage - 1}
					onPageChange={handlePageChange}
					containerClassName={'pagination-container'}
					previousLinkClassName={'nav-page'}
					breakClassName={'pages'}
					nextLinkClassName={'nav-page'}
					pageClassName={'pages'}
					disabledClassName={'disabled-page'}
					activeClassName={'active-page'}
				/>
			</div>
			<div className='products'>
				{loading && !errorMessage ? (
					<span>loading... </span>
				) : errorMessage ? (
					<div className='errorMessage'>{errorMessage}</div>
				) : (
					products.map((product, index) => (
						<Product key={`${index}-${product.title}`} product={product} />
					))
				)}
			</div>
			<div>
				<ReactPaginate
					pageCount={pageCount}
					pageRange={2}
					marginPagesDisplayed={1}
					disableInitialCallback={true}
					forcePage={currentPage - 1}
					onPageChange={handlePageChange}
					containerClassName={'pagination-container'}
					previousLinkClassName={'nav-page'}
					breakClassName={'pages'}
					nextLinkClassName={'nav-page'}
					pageClassName={'pages'}
					disabledClassName={'disabled-page'}
					activeClassName={'active-page'}
				/>
			</div>
		</div>
	);
};

export default App;
