import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Button, Icon, Fab, Header, Left, Right} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

import ListItem from '../../components/UploadFileListItem/UploadFileListItem';
import {API_MULTIPART_HEADER, API_URL} from '../../../appSetting';

class UploadPayslip extends Component {
  state = {
    files: [],
    isLoading: false,
  };

  handleAddFiles = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });

      this.setState({files: [...this.state.files, ...results]});

      console.log(this.state.files);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  handleRemoveFile = filename => {
    const data = this.state.files.filter(item => item.name !== filename);

    this.setState({files: data});
  };

  handleUpload = () => {
    if (this.state.files.length === 0) {
      return;
    }

    this.state.files.map(async file => {
      const formData = this.createFormData(file);
      const url = API_URL + 'payslip/upload';

      this.setState({isLoading: true});

      try {
        await axios.post(url, formData, API_MULTIPART_HEADER);
      } catch (error) {
        this.setState({isLoading: false});
      }

      this.setState({isLoading: false});
    });
  };

  // handleUpload2 = () => {
  //   if (this.state.files.length === 0) {
  //     return;
  //   }

  //   this.setState({isLoading: true});

  //   this.state.files.map(file => {
  //     const url = API_URL + 'payslip/upload';

  //     const data = new FormData();
  //     data.append('name', 'upload'); // you can append anyone.
  //     data.append('file', {
  //       uri: file.uri,
  //       type: file.type,
  //       name: file.name,
  //     });

  //     fetch(url, {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: data,
  //     })
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(function(error) {
  //         console.log(
  //           'There has been a problem with your fetch operation: ' +
  //             error.message,
  //         );
  //         throw error;
  //       });
  //   });

  //   this.setState({isLoading: false});
  // };

  createFormData = file => {
    const data = new FormData();

    data.append('file', {
      name: file.name,
      type: file.type,
      uri: file.uri,
    });

    return data;
  };

  renderFab = () => (
    <Fab
      active={this.state.active}
      direction="up"
      containerStyle={{}}
      style={styles.fab}
      position="bottomRight"
      onPress={this.handleAddFiles}>
      <Icon name="md-add" />
    </Fab>
  );

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Text style={styles.infoText}>
              Files : {this.state.files.length}
            </Text>
          </Left>
          <Right>
            <Button warning onPress={this.handleUpload}>
              <Text style={styles.buttonText}>Upload</Text>
            </Button>
          </Right>
        </Header>
        <FlatList
          data={this.state.files}
          extraData={this.state}
          refreshControl={<RefreshControl refreshing={this.state.isLoading} />}
          renderItem={({item}) => (
            <ListItem
              filename={item.name}
              type={item.type}
              size={item.size}
              onRemoveItem={() => this.handleRemoveFile(item.name)}
              style={item.selectedClass}
              selected={item.isSelected}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {this.renderFab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f353a',
    padding: 10,
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: '#ccc',
  },
  loader: {
    width: '100%',
    height: '100%',
  },
  fab: {backgroundColor: '#5067FF'},
  header: {
    backgroundColor: '#2f353a',
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonText: {fontSize: 16, color: '#FFF'},
});

export default UploadPayslip;
