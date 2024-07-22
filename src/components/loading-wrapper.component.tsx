import {CircularProgress} from "@mui/material";

type Props = {
    loading: boolean,
    children: React.JSX.Element
}

export default function LoadingWrapper({loading, children}: Props) {
    return (
        <div className='relative rounded overflow-hidden'>
            <div className='absolute bg-black/5 w-full h-full flex justify-center items-center' style={{visibility: loading ? 'visible' : 'hidden'}}>
                <CircularProgress />
            </div>
            {children}
        </div>
    );
}