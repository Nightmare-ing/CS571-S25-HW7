import { Text, View, Image, Dimensions } from "react-native";

export default function BadgerSaleItem(props) {
    return (
        <View style={{ alignItems: "center" }}>
            <Image
                style={{
                    width: "60%",
                    aspectRatio: 1,
                }}
                source={{ uri: props.imgSrc }}
                resizeMode="cover"
            />
            <Text
                style={{
                    fontSize: "36",
                    margin: "8",
                }}
            >
                {props.name}
            </Text>
            <Text style={{ fontSize: "24", margin: "8" }}>
                ${props.price?.toFixed(2)} each
            </Text>
            <Text style={{ fontSize: "16", margin: "8" }}>
                You can order up to {props.upperLimit} units!
            </Text>
        </View>
    );
}
