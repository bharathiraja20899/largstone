import React, {useState} from 'react';
import {
  VirtualizedList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Card, Divider, Header, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {appColors} from '../shared/appcolor';
import { Modal } from 'react-native';
import AddEditMarketing from './AddEditMarketing';

const horizontalData = ['Lead', 'Follow Up', 'Enquiries', 'Enquiry'];

const styles = StyleSheet.create({
  cardTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leadIdText: {fontSize: 14, color: 'grey'},
  rowView: {flexDirection: 'row', alignItems: 'center'},
  badgeView: {
    backgroundColor: '#d1ffcf',
    paddingHorizontal: 10,
    borderRadius: 14,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'darkgreen',
  },
  bodyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  leftView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  rightView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
});

const MarketingList = () => {

  // Variable to maintain list data
  const [data, setData] = useState([
    {
      leadId: 123,
      leadName: 'Buttler',
      leadType: 'Company',
      address: 'Calcut,Kerala ',
      done: '03/05/2023',
      isActive: true,
    },
    {
      leadId: 123,
      leadName: 'Jaiswal',
      leadType: 'Company',
      address: 'Calcut,Kerala',
      done: '07/05/2023',
      isActive: true,
    },
  ]);

  // Render item for virtualized list
  const renderItem = ({item, index}) => (
    <Card key={index}>
      <View style={styles.cardTopView}>
        <Text style={styles.leadIdText}>Lead ID : {item.leadId}</Text>
        <View style={styles.rowView}>
          <View style={styles.badgeView}>
            <MaterialCommunityIcons
              name="plus"
              size={14}
              color={'darkgreen'}
              style={{marginRight: 10}}
            />
            <Text style={{fontSize: 14, color: 'darkgreen'}}>Active</Text>
          </View>
          <Entypo name="dots-three-vertical" size={16} />
        </View>
      </View>

      <Divider style={{marginTop: 10}} />

      <View style={styles.bodyView}>
        <View style={{flex: 0.9}}>
          <View style={styles.leftView}>
            <Text style={{fontSize: 14}}>Lead Name : </Text>
            <Text style={{fontSize: 14}}>{item.leadName}</Text>
          </View>

          <View style={styles.rightView}>
            <Text style={{fontSize: 14}}>Lead Type : </Text>
            <Text style={{fontSize: 14}}>{item.leadType}</Text>
          </View>
        </View>

        <Divider orientation="vertical" style={{marginHorizontal: 10}} />

        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text style={{fontSize: 14}}>Address : </Text>
            <Text style={{fontSize: 14}}>{item.address}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 14}}>Done : </Text>
            <Text style={{fontSize: 14}}>{item.done}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
const [selected,setSelected]=useState(0)
  // Variable to open and close the add template
  const [isShow,setShow] = useState(false)

  return (
    <View style={{flex: 1, backgroundColor: appColors.light}}>
      <Header
        backgroundColor={appColors.primary}
        leftComponent={
          <View
            style={{flexDirection: 'row', alignItems: 'center', minWidth: 300}}>
            <Entypo name="menu" size={20} color={appColors.light} />
            <Text
              style={{fontSize: 17, marginLeft: 10, color: appColors.light}}>
              Marketing
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

      <ScrollView
        style={{minHeight : 30, maxHeight: 30, marginVertical: 10, marginLeft: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {horizontalData.map((item, index) => {
          return (
            <TouchableOpacity onPress={()=>{setSelected(index)}}
              key={index}
              style={{
                backgroundColor: selected!==index ? appColors.light : appColors.secondary,
                paddingHorizontal: 20,
                paddingTop: 5,
                borderRadius: 14,
                borderWidth: 0.6,
                borderColor: appColors.secondary,
                marginHorizontal: 5,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: selected!==index ? appColors.secondary : appColors.light,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Input
        inputContainerStyle={{
          borderWidth: 0.7,
          borderColor: '#ddd',
          paddingHorizontal: 10,
          marginHorizontal: 5,
          marginBottom: -20,
          marginTop: 10,
          backgroundColor: '#ddd',
        }}
        inputStyle={{fontSize: 14}}
        leftIcon={<AntDesign name="search1" size={16} />}
        rightIcon={<AntDesign name="menu-fold" size={16} />}
      />

      <VirtualizedList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        getItemCount={data => data.length}
        getItem={(data, index) => data[index]}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
      />

      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          marginBottom: 20,
          right: 20,
        }}>
        <View
          style={{
            display: 'flex',
            backgroundColor: appColors.secondary,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            elevation: 3,
          }}>
          <TouchableOpacity onPress={()=>setShow(true)}>
            <MaterialCommunityIcons name="plus" size={25} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={isShow}>
        <AddEditMarketing setShow={setShow} setData={setData}/>
      </Modal>

    </View>
  );
};

export default MarketingList;
