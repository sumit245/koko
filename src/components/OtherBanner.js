import React from 'react'
import NativeAdView, {
    CallToActionView,
    IconView,
    HeadlineView,
    TaglineView,
    AdvertiserView,
    AdBadge,
} from "react-native-admob-native-ads";
import { View, } from 'react-native'

export default function OtherBanner() {
    return (

        <NativeAdView
            style={{
                width: "100%", alignSelf: "center", height: 60, flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end'
            }}
            adUnitID="ca-app-pub-2607772918426768/7988639186">
            <AdBadge />
            <View style={{ height: 60, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingHorizontal: 10 }}>
                <IconView style={{ width: 60, height: 60, }} />
                <View style={{ width: "65%", maxWidth: "65%", paddingHorizontal: 6, }}>
                    <HeadlineView style={{ fontWeight: "bold", fontSize: 13, }} />
                    <TaglineView numberOfLines={1} style={{ fontSize: 11 }} />
                    <AdvertiserView style={{ fontSize: 10, color: "gray", }} />
                </View>
                <CallToActionView
                    style={{
                        height: 45,
                        paddingHorizontal: 12,
                        backgroundColor: "purple",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        elevation: 10,
                    }}
                    textStyle={{ color: "white", fontSize: 14 }}
                />
            </View>
        </NativeAdView >
    )
}
