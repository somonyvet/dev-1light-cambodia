import {useAppDispatch, useAppSelector} from "@lib/redux/hooks";
import {setIsLoading} from "../app/redux/features/loading.slice";

export const useLoading = () => {
    const {isLoading} = useAppSelector(state => state.loading);
    const dispatch = useAppDispatch();

    const onSetIsLoading = (value: boolean) => dispatch(setIsLoading(value));

    return {isLoading, onSetIsLoading}
}