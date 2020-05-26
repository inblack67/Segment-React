# Task specifications

## Step 1
You are to create a simple react webpage with two buttons in the center of the screen. The title in these buttons will be "button1" and "button2". 

The styling of these buttons is up to you. However, on desktop and tablet views, the buttons must be side to side with enough space. For mobile views, the buttons must be one below the other.

The React App should in a .jsx / .tsx file, and the views should be in markup. You should also use webpack for creating a react bundle.

## Step 2
Create an independent analytics script that will be loaded as a `<script>` tag in the index.html which also loads the React app.

This script should expose an interface like:
```ts
// eventName: string
// metaData: optional object (defaults to {})

stAnalytics.getInstance().sendButtonEvent(eventName, metaData);

stAnalytics.getInstance().sendPageViewEvent(eventName, metaData)
```
We want to be able to call these two functions from the react app.

Note: While this script has not loaded, the `stAnalytics` variable in the react app will be `undefined`.

`sendButtonEvent` and `sendPageViewEvent` should use a common, private function called `sendAnalytics(eventName, type, metadata)`. The `type` value for `sendButtonEvent` is `button` and for `sendPageViewEvent` is `page`.

## Step 3
```ts
// eventName: string
// type: "button" | "page"
// metaData: optional object (defaults to {})
sendAnalytics(eventName, type, metaData)
```
When this function is called, we want create a new `metaData` object that contains `userId`, `type` and the input `metaData` object (this should be renamed to `userMetaData` inside the object).

`userId` will be read from `localstorage` when `stAnalytics.getInstance()` is called and then saved in memory (we do not want to read from `localstorage` again and again since that is sync and expensive).

If the `userId` in the `localstorage` does not exist, then you have to create one at that time (random UUID) and save that in the `localstorage`.


## Step 4
There are two sets of users for the website:
- Internal developers (you, me, our team)
- External visitors (people who visit our site)

Internal developers will preset their `userId` in the `localstorage` to be a special value: `internal-123`.

External visitors will get a random UUID as their `userId` based on Step 3.

If the current `userId` is equal to `internal-123`, then in the `sendAnalytics` function, we want to only `console.log` the `eventName` and the final `metadata` (which contains `userId`, `type` and `userMetaData`).

If the current `userId` is NOT equal to `internal-123`, we want to send the analytics event to our backend API (Step 5) and to Segment (https://segment.com/ - Step 6). Note that if any one of them fail for whatever reason, the other call should not be affected in anyway.


## Step 5
You have to send a `POST` request to `https://example.com` with the following body:
```
{
    userId, type, userMetaData
}
```

## Step 6
You have to call segment's API using their SDK. The params to the APIs should be `eventName` and `metaData`. You will need to sign up for segment and refer to their docs to know more about how to do this.

The segment SDK will need to be loaded in the html file that loads this script and the react app.

You will also need to initialize segment somewhere in your script. This should be done just once even if there are many calls to `sendAnalytics`.

## Step 7
When the webpage is loaded, call the following:
```
stAnalytics.getInstance().sendPageViewEvent("home_page_viewed", {})
```

When the user clicks on "button1", the following is called:
```
stAnalytics.getInstance().sendButtonEvent("button_clicked", {
    name: "button1"
})
```

When the user clicks on "button2", the following is called:
```
stAnalytics.getInstance().sendButtonEvent("button_clicked", {
    name: "button2"
})
```

## Submission
You are to submit the work in a zip file. To see this work, I should just have to open some `index.html` in the zip file which should load the react app, segment SDK and analytics script.

First I will be a visitor, and the events will be sent to `example.com` (which may fail - but doesn't matter), and to segment (which must succeed).

Then I will change my `localstorage` to reflect an Internal developer (please provide clear instructions in a README.md file on how to do this). Now the events should not be sent to `example.com` or segment. Instead, they should be logged in the browser console.

## Questions and help
- You can reach out to me any time you like via email or mobile number
- You need to do all the tasks mentioned above, but of course, that will be considered in your evaluation.
- If you do not have time to do this task or think it's a lot, please reply to my email saying the same - i'll be happy to discuss alternatives.
