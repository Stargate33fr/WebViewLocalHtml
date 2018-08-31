import React, { Component } from 'react';
import {
    WebView,
    View,
    StyleSheet,
    Platform,
    Text,
    Linking
} from 'react-native';

const isAndroid= Platform.OS==='android'

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    _onNavigationStateChange(webViewState){
        if (1==0){
            let redirectCode = `window.location = '${LOGIN_URL}';`;
        }

        return false;
    }

    onPageLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        console.warn("ON LAYOUT" + width.toString() + " " +height.toString());
        this.setState({width, height})
    };


    lapsList(pos) {
        const targeting =`pos:${pos}|requete:avengers|fullscreen:NON`;
        let target ='';

        targeting.split("|").forEach((data) => {
            target += `adSlot1.setTargeting("${data.split(':')[0]}","${data.split(':')[1]}");`
        })

        return target;
    }

    render() {
        var htmlContent = '<p><a href="http://jsdf.co">&hearts; nice job!</a></p>';
        // Cdiscount_App_Android
        const jsCode = `
        googletag.cmd.push(function() {
          var adSlot1 = googletag.defineSlot('7190/Cdiscount_App_Android/telephonie/recherche/pave-inpage', [300, 250] , "banner1");
          adSlot1.addService(googletag.pubads());
          ${this.lapsList('pave-inpage')}
          googletag.pubads().set('page_url', 'http://www.cdiscount.com/');
          googletag.enableServices();
          googletag.display('banner1');
      })`;


        const jsCode2 = `
      googletag.cmd.push(function() {
         var adSlot1 = googletag.defineSlot('7190/Cdiscount_App_Android/telephonie/recherche/banner-inpage',  [320, 50] , "banner2");
         adSlot1.addService(googletag.pubads());
          ${this.lapsList('banner-inpage')}
         googletag.pubads().set('page_url', 'http://www.cdiscount.com/');
         googletag.enableServices();
         googletag.display('banner2'); 
     })`;

       const jsCode3 = `
        function ready() {
            var iframe= window.frames["google_ads_iframe_7190/Cdiscount_Smartphone/jeux-jouets/recherche/native-line_0"];
            iframe.height="200px";
            iframe.width="100%";
        };
       
        googletag.cmd.push(function() {
            var adSlot1 = googletag.defineSlot('7190/Cdiscount_Smartphone/jeux-jouets/recherche/native-line', 'fluid', "banner3");
            adSlot1.addService(googletag.pubads());
           ${this.lapsList('native-line')}
            googletag.pubads().enableSingleRequest();
            googletag.pubads().set('page_url', 'http://www.cdiscount.com/');
            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
               ready();
            });
            googletag.pubads().set('page_url', 'http://www.cdiscount.com/');
            googletag.enableServices();
            googletag.display('banner3'); 
        });`;

        return (

            <View style={styles.container} onLayout={this.onPageLayout}>
                <Text>Publicité</Text>
                <WebView
                    style={styles.webView}
                    source={{uri:isAndroid?'file:///android_asset/widget/ad.html':'./widget/index.html', }}
                    javaScriptEnabled={true}
                    mixedContentMode="always"
                    injectedJavaScript={jsCode}
                    scrollEnabled={false}
                    onNavigationStateChange={(event) => {
                        if (event.url.startsWith("http://") || event.url.startsWith("https://")) {
                            Linking.openURL(event.url);
                        }
                    }}
                    />
                <WebView
                    style={styles.webView2}
                    source={{uri:isAndroid?'file:///android_asset/widget/ad.html':'./widget/index.html', }}
                    javaScriptEnabled={true}
                    mixedContentMode="always"
                    injectedJavaScript={jsCode2}
                    scrollEnabled={false}
                    startInLoadingState={true}
                    onNavigationStateChange={(event) => {
                        if (event.url.startsWith("http://") || event.url.startsWith("https://")) {
                            Linking.openURL(event.url);
                        }
                    }}
                    />
                <WebView
                    style={styles.webView3}
                    source= {{uri:isAndroid?'file:///android_asset/widget/ad.html':'./widget/index.html'}}
                    javaScriptEnabled={true}
                    mixedContentMode="always"
                    injectedJavaScript={jsCode3}
                    startInLoadingState={true}
                    scrollEnabled={false}
                    onNavigationStateChange={(event) => {
                        if (event.url.startsWith("http://") || event.url.startsWith("https://")) {
                            Linking.openURL(event.url);
                        }
                    }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        backgroundColor: 'yellow',
        flex: 1,
    },
    webView2: {
        backgroundColor: '#f0f',
        flex: 1,
    },
    webView3: {
        backgroundColor: '#fff',
        flex: 1,
    },
    banner_AD: {
        alignSelf: 'center',
        width: 320,
        height: 50,
        marginTop: 4,
        marginBottom: 10,
    },
})