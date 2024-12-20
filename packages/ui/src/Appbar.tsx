import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null
    },
    onSignin: any,
    onSignout: any
}


export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
    return (
        <div className="flex justify-between px-5 border-b items-center py-3 sticky top-0 z-30 bg-white">
            <span className="font-bold text-base cursor-pointer">VELOCIPAY</span>
            <div className="">
                <Button onClick={user ? onSignout : onSignin}>{<LogoutIcon />}</Button>
            </div>
        </div>
    )
}

function LogoutIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>

    )
}