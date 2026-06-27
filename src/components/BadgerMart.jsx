import { Text, View, Button } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
    const [curItemIdx, setCurItemIdx] = useState(0);
    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw7/items", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
            });
    }, []);

    return (
        <View>
            <Text style={{ fontSize: 28 }}>Welcome to Badger Mart!</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    marginVertical: 10,
                }}
            >
                <Button
                    title="PREVIOUS"
                    disabled={curItemIdx === 0}
                    onPress={() => {
                        setCurItemIdx((prev) => prev - 1);
                    }}
                />
                <Button
                    title="NEXT"
                    disabled={curItemIdx === items.length - 1}
                    onPress={() => {
                        setCurItemIdx((prev) => prev + 1);
                    }}
                />
            </View>
            {items.length !== 0 ? (
                <BadgerSaleItem {...items[curItemIdx]} />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
}
