import { Text, View, Image, Dimensions, Button } from "react-native";

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
                    fontSize: 36,
                    margin: 8,
                }}
            >
                {props.name}
            </Text>
            <Text style={{ fontSize: 24, margin: 8 }}>
                ${Number(props.price).toFixed(2)} each
            </Text>
            <Text style={{ fontSize: 16, margin: 8 }}>
                You can order up to {props.upperLimit} units!
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                    key={
                        props.itemInBusket <= 0 ? "dec-disabled" : "dec-enabled"
                    }
                    disabled={props.itemInBusket <= 0}
                    title="-"
                    onPress={() => {
                        props.changeItemInBusketBy(-1);
                    }}
                />
                <Text style={{ padding: 12, textAlignVertical: "center" }}>
                    {props.itemInBusket}
                </Text>
                <Button
                    key={
                        props.itemInBusket >= props.upperLimit
                            ? "inc-disabled"
                            : "inc-enabled"
                    }
                    disabled={props.itemInBusket >= props.upperLimit}
                    title="+"
                    onPress={() => {
                        props.changeItemInBusketBy(1);
                    }}
                />
            </View>
        </View>
    );
}
