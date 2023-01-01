import { View, Text, StyleSheet, Image, TextInput, ScrollView, Modal } from 'react-native';
import { Input } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { useState } from 'react';
import { AddCustomer, UpdateCustomer } from '../api/customers';
import { useSelector, useDispatch } from 'react-redux';
import { addCustomer, updateCustomer } from '../redux/slice/customersSlice';
import { Customer } from '../interface';
import CustomButton from './CustomButton';
import { stylesGlobal } from '../util/styleGlobal';
import Filters from './Filters';



export interface formCustomer {
    nom: string;
    nomError: string;
    prenom: string;
    prenomError: string;
    email: string;
    emailError: string;
    telephone: string;
    telephoneError: string;
    faxe: string;
    faxeError: string;
    telephone_mobile: string;
    telephone_mobileError: string;
    address: string;
    addressError: string;
    ville: string;
    villeError: string;
    description: string;
    descriptionError: string;
    code_postal: string;
    code_postalError: string;

}

interface ViewForm {
    view: string;
}

export default function CustomersAdd({ curentCustomer, isModalView, setModalView }: { curentCustomer: Customer | null, isModalView: boolean, setModalView: (value: boolean) => void }) {

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const defaultFormValue: formCustomer = getDefaultValueForm(curentCustomer);

    const [form, setForm] = useState<formCustomer>(defaultFormValue);

    const [curentViewForm, setCurentViewForm] = useState<ViewForm>({ view: "info" });

    function SubmitCustomer() {

        if (curentCustomer === null) {
            AddCustomer(form, user.user).then((customer) => {

                if (customer !== undefined) {

                    dispatch(addCustomer(customer));
                    setModalView(false);

                }

            }).catch((error) => { console.error(error) });

        } else {

            const newCustomer = {
                ...curentCustomer,
                attributes: {
                    ...curentCustomer.attributes,
                    nom: form.nom,
                    prenom: form.prenom,
                    email: form.email,
                    telephone: parseInt(form.telephone),
                    faxe: parseInt(form.faxe),
                    telephone_mobile: parseInt(form.telephone_mobile),
                    address: form.address,
                    ville: form.ville,
                    description: form.description,
                    code_postal: form.code_postal

                }
            }

            UpdateCustomer(newCustomer, user.user).then((customer) => {

                if (customer !== undefined) {

                    dispatch(updateCustomer(newCustomer));
                    setModalView(false);

                }

            }).catch((error) => { console.error(error) });
        }

    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isModalView}
            onRequestClose={() => {
                setModalView(false);
            }}
            style={{ padding: 20 }}>

            <View style={stylesGlobal.padding} >
                <Text style={styles.title}>Ajouter un client</Text>

                <Filters
                    filter={[
                        { label: "Info client", isDefault: true, value: "info" },
                        { label: "Adresse du client", value: "adresse" },
                        { label: "Cordonnée du client", value: "contact" }
                    ]}
                    params={{
                        isUnderlineActive: true,
                        colorActive: "#2e64e5",
                    }}

                    onPress={(value) => setCurentViewForm({ view: value })}

                />



                <View style={styles.container}>


                    {
                        curentViewForm.view === "info" &&
                        <View>

                            <Input
                                value={form.nom}
                                style={styles.input}
                                placeholder='Nom *'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, nom: text }, setForm);
                                }}
                                errorMessage={form.nomError}
                            />
                            <Input
                                value={form.prenom}
                                style={styles.input}
                                placeholder='Prénom *'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, prenom: text }, setForm);
                                }}
                                errorMessage={form.prenomError}
                            />

                            <Input
                                value={form.email}
                                style={styles.input}
                                placeholder='Email '
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, email: text }, setForm);
                                }}
                                errorMessage={form.emailError}
                            />
                            <Input
                                style={styles.input}
                                value={form.description}
                                placeholder='Description'
                                multiline={true}
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, description: text }, setForm);
                                }
                                }
                                errorMessage={form.descriptionError}

                            />
                        </View>}
                    {
                        curentViewForm.view === "adresse" &&
                        <View>
                            <Input
                                value={form.address}
                                style={styles.input}
                                placeholder='Adresse'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, address: text }, setForm);
                                }}
                                errorMessage={form.addressError}
                            />
                            <Input
                                style={styles.input}
                                value={form.ville}
                                placeholder='Ville'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, ville: text }, setForm);
                                }}
                                errorMessage={form.villeError}
                            />
                            <Input
                                style={styles.input}
                                value={form.code_postal}
                                placeholder='Code postal'
                                keyboardType='phone-pad'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, code_postal: text }, setForm);
                                }}
                                errorMessage={form.code_postalError}
                            />
                        </View>}
                    {
                        curentViewForm.view === "contact" &&
                        <View>
                            <Input
                                style={styles.input}
                                value={form.telephone}
                                placeholder='Téléphone Fixe'
                                keyboardType='phone-pad'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, telephone: text }, setForm);
                                }}
                                errorMessage={form.telephoneError}
                            />
                            <Input
                                style={styles.input}
                                value={form.telephone_mobile}
                                placeholder='Téléphone Mobile'
                                keyboardType='phone-pad'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, telephone_mobile: text }, setForm);
                                }}
                                errorMessage={form.telephone_mobileError}
                            />
                            <Input
                                style={styles.input}
                                value={form.faxe}
                                placeholder='Fax'
                                keyboardType='phone-pad'
                                onChangeText={(text) => {

                                    ValidateInput({ ...form, faxe: text }, setForm);
                                }}
                                errorMessage={form.faxeError}
                            />




                        </View>}

                </View>
                <CustomButton
                    label='suivant'
                    onPress={() => setCurentViewForm(
                        curentViewForm.view === "info" ? { view: "adresse" } :
                            curentViewForm.view === "adresse" ? { view: "contact" } : { view: "info" })}
                    icon={undefined} />

                <CustomButton
                    label={curentCustomer !== null ? "Modifier" : "Ajouter"}
                    disabled={getMinimumRequiredFields(form)}
                    icon={undefined}
                    onPress={() => SubmitCustomer()}

                />

            </View>
        </Modal>
    )

    function getDefaultValueForm(_curentCustomer: Customer | null): formCustomer {

        return _curentCustomer !== null ? {
            nom: _curentCustomer.attributes.nom,
            nomError: '',
            prenom: _curentCustomer.attributes.prenom,
            prenomError: '',
            email: _curentCustomer.attributes.email ? _curentCustomer.attributes.email.toString() : '',
            emailError: '',
            telephone: _curentCustomer.attributes.telephone ? _curentCustomer.attributes.telephone.toString() : '',
            telephoneError: '',
            faxe: _curentCustomer.attributes.faxe ? _curentCustomer.attributes.faxe.toString() : '',
            faxeError: '',
            telephone_mobile: _curentCustomer.attributes.telephone_mobile ? _curentCustomer.attributes.telephone_mobile.toString() : '',
            telephone_mobileError: '',
            address: _curentCustomer.attributes.address ? _curentCustomer.attributes.address.toString() : '',
            addressError: '',
            ville: _curentCustomer.attributes.ville ? _curentCustomer.attributes.ville.toString() : '',
            villeError: '',
            description: _curentCustomer.attributes.description ? _curentCustomer.attributes.description.toString() : '',
            descriptionError: '',
            code_postal: _curentCustomer.attributes.code_postal ? _curentCustomer.attributes.code_postal.toString() : '',
            code_postalError: '',

        } : resetForm();
    }

    function resetForm() {
        return {
            nom: '',
            nomError: '',
            prenom: '',
            prenomError: '',
            email: '',
            emailError: '',
            telephone: '',
            telephoneError: '',
            faxe: '',
            faxeError: '',
            telephone_mobile: '',
            telephone_mobileError: '',
            address: '',
            addressError: '',
            ville: '',
            villeError: '',
            description: '',
            descriptionError: '',
            code_postal: '',
            code_postalError: '',

        }
    }
}


function getMinimumRequiredFields(form: { [key: string]: any }) {
    const requiredFields = ['nom', 'prenom'];

    for (const field of requiredFields) {
        if (form[field] === '') {
            return true;
        }
    }

    return false;
}





function ValidateInput(form: { [key: string]: any }, setForm: (value: any) => void) {

    const newForm = { ...form };
    /* clear Error */
    newForm.nomError = '';
    newForm.prenomError = '';
    newForm.emailError = '';
    newForm.telephoneError = '';
    newForm.faxeError = '';
    newForm.telephone_mobileError = '';
    newForm.addressError = '';
    newForm.villeError = '';
    newForm.descriptionError = '';
    newForm.code_postalError = '';


    /* validate  */
    if (!valadateEmail(form.email) && form.email !== '') {

        newForm.emailError = 'Email invalide';


    }

    if (!validatePhone(form.telephone) && form.telephone !== '') {

        newForm.telephoneError = 'Téléphone invalide';

    }

    if (!validatePhone(form.telephone_mobile) && form.telephone_mobile !== '') {

        newForm.telephone_mobileError = 'Téléphone mobile invalide';

    }

    if (!validatePhone(form.faxe) && form.faxe !== '') {

        newForm.faxeError = 'Fax invalide';

    }

    if (!validatePostalCode(form.code_postal) && form.code_postal !== '') {

        newForm.code_postalError = 'Code postal invalide';

    }

    setForm(newForm);


}



function valadateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone: string) {
    const re = /^\d{10}$/;
    return re.test(String(phone));
}

function validatePostalCode(postalCode: string) {
    const re = /^\d{5}$/;
    return re.test(String(postalCode));
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginBottom: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20

    },
    input: {
        marginBottom: 8,

    },
    button: {
        marginTop: 8,
        marginBottom: 8,
        width: '100%',
    }
})