import {useState, useCallback, useEffect, createContext, useContext} from 'react';
import axios from 'axios'


const initialState = {
    categories: [],
    loading: false,
    error: null,
    success: null
}

const CategoriesContext = createContext(initialState);

export const CategoriesProviders = ({children}) => {
    const [state, setState] = useState(initialState);

    const fetchCategories = async () => {
        setState({...state, loading: true});
        try {
            const {data} = await axios.get("http://localhost:5000/api/v1/categories");
            setState({...state, loading: false, categories: data.categories});
        } catch (error) {
            setState({...state, loading: false, error: error.response.message});
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    console.log(state.categories)
    const addCategory = async (category) => {
        setState({...state, loading: true});
        try {
            const {data} = await axios.post("http://localhost:5000/api/v1/categories", category);
            setState({...state, loading: false, success: data.success});
            fetchCategories();

        } catch (error) {
            console.log(error.response.data.message)
        }
    }



    return (
        <CategoriesContext.Provider value={{...state, addCategory}}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategoriesContext = () => useContext(CategoriesContext);