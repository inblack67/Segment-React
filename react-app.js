function App() {

    document.cookie = 'SameSite=None Secure'

    React.useEffect(() => {
        stAnalytics.getInstance().sendPageViewEvent('home_page_viewed', {})
        // eslint-disable-next-line
    },[])


    return (
    <div className="App">
        <div className="button-container">
            <a href="#!" className='btn red' onClick={button1Clicked}>button1</a>
            <a href="#!" className='btn red' onClick={button2Clicked}>button2</a>
        </div>
    </div>
    );
    }

    ReactDOM.render(<App />, document.getElementById('root'))