import { Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from "@cs571/mobile-client";
import { useEffect, useState } from "react";

export default function BadgerMart(props) {
    const [items, setItems] = useState([]);
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
            {items ?
                <BadgerSaleItem {...items[0]} />
            :   <Text>Loading...</Text>}
        </View>
    );
}
