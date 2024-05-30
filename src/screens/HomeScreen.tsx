import { View } from "react-native";
import Principal from "../layouts/Principal";
import { HomeProps } from "../types";
import TelaLogin from "../layouts/TelaLogin";

const HomeScreen = ({ navigation, route }: HomeProps) => {
    return (
        <Principal navigation={navigation} route={route} />
    );
};

export default HomeScreen;