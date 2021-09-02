export const initialState = {
	loading: true,
	products: [],
	errorMessage: null,
	currentPage: 1,
	pageCount: 0,
	currentSearch: '',
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_PRODUCTS_REQUEST':
			return {
				...state,
				loading: true,
				errorMessage: null,
				currentSearch: action.currentSearch,
			};
		case 'SEARCH_PRODUCTS_SUCCESS':
			return {
				...state,
				loading: false,
				products: action.payload.results,
				pageCount: action.payload.pagination.totalPages,
				currentPage: action.payload.pagination.currentPage,
			};
		case 'SEARCH_PRODUCTS_FAILURE':
			return {
				...state,
				loading: false,
				errorMessage: action.error,
			};
		default:
			return state;
	}
};
