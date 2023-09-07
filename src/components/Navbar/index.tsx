"use client";

export const Navbar = () => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-row justify-between basis-1/6">
                <div><button>Coins</button></div>
                <div><button>Portfolio</button></div>
            </div>
            <div className="flex flex-row justify-between basis-1/3">
                <div><input placeholder="Search"></input></div>
                <div><button>$ USD</button></div>
                <button>DarkMode</button>
            </div>
        </div>
    )
}