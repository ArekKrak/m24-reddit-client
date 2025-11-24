export default function Header() {

    return (
        <header className="header-style">
            <h1>Reddit Light</h1>
            <div className="header-search">
                <input className="header-placeholder" type="text" placeholder="Search Reddit..." />
                <button className="header-button">Search</button>
            </div>
        </header>
    );
}