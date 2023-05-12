import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button, Header, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../shared/appcolor';
import {TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {KeyboardAvoidingView} from 'react-native';
import moment from 'moment';
import * as Yup from 'yup';
const AddEditMarketing = ({setShow, setData}) => {
  // Variable to handle selected time picker and date picker
  const [currentValue, setCurrentValue] = useState(false);

  //   Lead type dropdown data
  const type = [
    {
      label: 'Lead',
      value: 'Lead',
    },
    {
      label: 'Customer',
      value: 'Customer',
    },
  ];

  const [customerTypeOpen, SetCustomerTypeOpen] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const validationSchema = Yup.object().shape({
    leadId: Yup.string().required('Lead Id is required'),
    leadName: Yup.string().required('Lead Name is required'),
    managedBy: Yup.string().required('Managed By is required'),
    entryDate: Yup.string().required('Entry Date is required'),
    nextFollowup: Yup.string().required('Next Follow Up is required'),
    refName: Yup.string().required('Refercence name is required'),
    refInfo: Yup.string().required('Refercence Info is required'),
    currentSupplier: Yup.string().required('Current Supplier is required'),
    customerType: Yup.string().required('Customer Type is required'),
    address: Yup.string().required('Address is required'),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      leadId: '',
      leadName: '',
      managedBy: '',
      customerType: '',
      entryDate: '',
      nextFollowup: '',
      refName: '',
      refInfo: '',
      currentSupplier: '',
      propertyType: '',
      businessType: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit:()=>{handleSubmit()},
  });

  const handleOpenDate = () => {
    setDatePickerVisibility(true);
  };

  const handleSubmit = () => {
    let data = {
      leadId: formik.values.leadId,
      leadName: formik.values.leadName,
      leadType: formik.values.customerType,
      address: formik.values.address,
      done: formik.values.entryDate,
      isActive: true,
    };
    console.log('data', data);
    setData(prev => [...prev, ...[data]]);
    setShow(false);
  };

  return (
    <KeyboardAvoidingView enabled style={{flex: 1}}>
      {/* Header View */}
      <Header
        backgroundColor={appColors.primary}
        leftComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              minWidth: 300,
            }}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <AntDesign name="arrowleft" size={20} color={appColors.light} />
            </TouchableOpacity>
            <Text
              style={{fontSize: 17, marginLeft: 10, color: appColors.light}}>
              Create Lead
            </Text>
          </View>
        }
        rightComponent={
          <MaterialCommunityIcons
            name="bell"
            size={20}
            color={appColors.light}
          />
        }
      />

      <ScrollView>
        {/* Form View */}
        <View>
          {/* leadId */}
          <Input
            placeholder="Lead ID"
            value={formik.values?.leadId}
            errorMessage={
              formik.touched?.leadId && formik.errors.leadId
                ? formik.errors.leadId
                : null
            }
            inputStyle={{fontSize: 14}}
            onBlur={formik.handleBlur('leadId')}
            onChangeText={text => formik.setFieldValue('leadId', text)}
            inputContainerStyle={{borderBottomColor: '#ddd'}}
          />

          <Input
            placeholder="Lead Name"
            value={formik.values?.leadName}
            errorMessage={
              formik.touched?.leadName && formik.errors.leadName
                ? formik.errors.leadName
                : null
            }
            onBlur={formik.handleBlur('leadName')}
            inputStyle={{fontSize: 14}}
            onChangeText={text => formik.setFieldValue('leadName', text)}
            inputContainerStyle={{borderBottomColor: '#ddd'}}
          />

          <Input
            placeholder="Managed By"
            value={formik.values?.managedBy}
            errorMessage={
              formik.touched?.managedBy && formik.errors.managedBy
                ? formik.errors.managedBy
                : null
            }
            onBlur={formik.handleBlur('managedBy')}
            onChangeText={text => formik.setFieldValue('managedBy', text)}
            inputStyle={{fontSize: 14}}
            inputContainerStyle={{borderBottomColor: '#ddd'}}
          />
          <View
            style={{
              zIndex: customerTypeOpen ? 1 : 0,
              paddingHorizontal: 10,
              paddingTop: -10,
              marginBottom: 15,
            }}>
            <DropDownPicker
              items={type}
              open={customerTypeOpen}
              setOpen={SetCustomerTypeOpen}
              textStyle={{fontSize: 15,marginLeft:-5}}
              selectedItemLabelStyle={{color: appColors.primary, fontSize: 15}}
              tickIconStyle={{tintColor: appColors.primary}}
              dropDownDirection={'BOTTOM'}
              value={formik?.values?.customerType}
              onSelectItem={value => {
                formik.setFieldValue('customerType', value?.value);
              }}
              onPress={()=>{formik.setFieldTouched('customerType', true)}}
              placeholder="Customer Type"
              listMode="SCROLLVIEW"
              dropDownContainerStyle={{
                borderColor: '#ddd',
                borderWidth: 1,
              }}
              zIndex={1}
              style={{
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderRadius: 0,
                borderBottomColor: '#ddd',
              }}
              
              placeholderStyle={{color:'grey',fontSize:14}}
            />
          </View>
            {(formik.touched?.customerType && formik.errors.customerType) ? 
              <Text style={{color: 'red', fontSize: 13,paddingHorizontal:10,marginTop:-10}}>
                {formik.errors.customerType}
              </Text>
             : null}
          <View style={{zIndex: customerTypeOpen ? -1 : 1}}>
            <Input
              value={String(formik?.values?.entryDate)}
              placeholder="Entry Date"
              editable={false}
              rightIcon={
                <TouchableOpacity
                  onPress={() => {
                    handleOpenDate();
                    setCurrentValue(true);
                    formik?.setFieldTouched('entryDate', true);
                  }}>
                  <MaterialIcons name="date-range" size={18} />
                </TouchableOpacity>
              }
              inputStyle={{fontSize: 14}}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
              onBlur={formik.handleBlur('entryDate')}
              errorMessage={
                formik.touched?.entryDate && formik.errors.entryDate
                  ? formik.errors.entryDate
                  : null
              }
            />

            <Input
              value={String(formik?.values?.nextFollowup)}
              placeholder="Next FollowUp"
              editable={false}
              rightIcon={
                <TouchableOpacity
                  onPress={() => {
                    handleOpenDate();
                    setCurrentValue(false);
                    formik?.setFieldTouched('nextFollowup', true);
                  }}>
                  <MaterialIcons name="date-range" size={18} />
                </TouchableOpacity>
              }
              inputStyle={{fontSize: 14}}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
              errorMessage={
                formik.touched?.nextFollowup && formik.errors.nextFollowup
                  ? formik.errors.nextFollowup
                  : null
              }
            />

            <Input
              placeholder="Ref Name"
              value={formik.values?.refName}
              errorMessage={
                formik.touched?.refName && formik.errors.refName
                  ? formik.errors.refName
                  : null
              }
              onBlur={formik.handleBlur('refName')}
              onChangeText={text => formik.setFieldValue('refName', text)}
              inputStyle={{fontSize: 14}}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
            />

            <Input
              placeholder="Ref Info"
              value={formik.values?.refInfo}
              onBlur={formik.handleBlur('refInfo')}
              errorMessage={
                formik.touched?.refInfo && formik.errors.refInfo
                  ? formik.errors.refInfo
                  : null
              }
              onChangeText={text => formik.setFieldValue('refInfo', text)}
              inputStyle={{fontSize: 14}}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
            />

            <Input
              placeholder="Current Supplier"
              value={formik.values?.currentSupplier}
              errorMessage={
                formik.touched?.currentSupplier && formik.errors.currentSupplier
                  ? formik.errors.currentSupplier
                  : null
              }
              onChangeText={text =>
                formik.setFieldValue('currentSupplier', text)
              }
              inputStyle={{fontSize: 14}}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
              onBlur={formik.handleBlur('currentSupplier')}
            />

            <Input
              placeholder="Address"
              value={formik.values?.address}
              errorMessage={
                formik.touched?.address && formik.errors.address
                  ? formik.errors.address
                  : null
              }
              inputStyle={{fontSize: 14}}
              onChangeText={text => formik.setFieldValue('address', text)}
              inputContainerStyle={{borderBottomColor: '#ddd'}}
              onBlur={formik.handleBlur('address')}
            />
          </View>
        </View>

        <Button
          title={'Submit'}
          onPress={() => {
            formik.handleSubmit()
          }}
          titleStyle={{fontSize: 14}}
          buttonStyle={{
            width: 100,
            alignSelf: 'center',
            marginBottom: 10,
            borderRadius: 20,
            backgroundColor: appColors.primary,
          }}
        />
      </ScrollView>
      {isDatePickerVisible ? (
        <DateTimePicker
          value={new Date()}
          mode={'date'}
          is24Hour={false}
          display="spinner"
          themeVariant={'light'}
          // textColor={theme.dark}
          onChange={(event, selectedDate) => {
            setDatePickerVisibility(false);
            if (event.type === 'set') {
              formik?.setFieldValue(
                currentValue ? 'entryDate' : 'nextFollowup',
                moment(selectedDate).format('MM/DD/YYYY'),
              );
            }
          }}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default AddEditMarketing;
