const sendAnalytics = (eventName, type, metaData = {}) => {
    let userId = '';
    metaData = {
        userMetaData: { ...metaData },
        userId: localStorage.getItem('userId'),
        type: type,
    }
    userId = localStorage.getItem('userId');
    if(userId){
        if(userId === 'internal-123'){
            console.log({ eventName, metaData });
        }
        else{
            const config = {
                'Content-Type': 'application/json'
            }
            const reqBody = { userId, type, usermetaData: metaData.userMetaData }

            const request = async () => {
                try{
                    const response = await fetch('http://example.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reqBody)
                        })
                    console.log(response);
                }
                catch(err){
                    console.error(err)
                }
                try {
                    const params = { eventName, metaData };
                    const response = await fetch('https://api.segment.io/v1/identify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(params)
                        })
                    console.log('Segment API Response', response); 
                } catch (err) {
                    console.error(err)
                }
            }
            request();
        }
    }
    else{
        userId = window.uuid.v4()
        localStorage.setItem('userId', userId);
    }
}

const stAnalytics = {
    getInstance: () => {
        return {
        sendButtonEvent: (eventName, metaData) => {
            sendAnalytics(eventName, 'button', metaData); 
        },
            sendPageViewEvent: (eventName, metaData) => {
            sendAnalytics(eventName, 'page', metaData); 
        }
    }
    } 
}

const button1Clicked = e => {
    stAnalytics.getInstance().sendButtonEvent("button_clicked", {
        name: "button1"
    })
}

const button2Clicked = e => {
    stAnalytics.getInstance().sendButtonEvent("button_clicked", {
        name: "button2"
    })
}
