import React from 'react';
import {Button, NativeSyntheticEvent, NativeTouchEvent, Text, View, Image, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { deleteAlert } from '../../redux/alerts/alerts.actions';
import { selectFirebaseTokenId } from '../../redux/firebase/firebase.selectors';
import { AppState } from '../../redux/root-reducer';
import { fArgReturn } from '../../utils/types';
import { IAlert as IReceivedProps } from '../../models/admin/IAlert';
import {generateAlertMessage} from './alert-summary.utils';
import Icon from 'react-native-vector-icons/Ionicons';
import { renderIcon } from '../../utils/functions';
import { appTextColour } from '../../utils/styles';
import { 
    border,
    container,
    image,
    imageColumn,
    textColumn,
    headingWrap,
    heading,
    dataWrap,
    delIcon,
    dataHeadingText
} from './alert-summary.styles';
import { selectAlertPendingDelete, selectDeleteAlertFlow } from '../../redux/alerts/alerts.selectors';
import { AlertFlow } from '../../redux/alerts/alerts.reducer';
import { resetDeleteAlertFlow } from '../../redux/alerts/alerts.actions';



interface IReduxStateProps {
    fcmTokenAdminId: number | null,
    alertFlow: AlertFlow,
    alertPendingDelete: null | number
}

interface IDispatchProps {
    deleteAlert: fArgReturn,
    resetDeleteAlertFlow: fArgReturn
}

type AlertSummaryProps = IReceivedProps & IDispatchProps & IReduxStateProps;

class AlertSummary extends React.Component<AlertSummaryProps> {
    
    componentDidUpdate() {
        const { alertFlow, resetDeleteAlertFlow } = this.props

        if (alertFlow === 'success') {
            resetDeleteAlertFlow();

            ToastAndroid.showWithGravity(
                'Alert deleted successfully',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        if (alertFlow === 'failure') {
            resetDeleteAlertFlow();

            ToastAndroid.showWithGravity(
                'There was a problem deleting your alert, please try again later',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }
    
    generateIcon = () => {

        const { alertPendingDelete, id, fcmTokenAdminId, deleteAlert } = this.props

        if (alertPendingDelete !== null && alertPendingDelete === id) {
            return  <Icon 
                name="hourglass-outline" 
                size={30} 
                color={appTextColour} 
                style={delIcon}
                onPress={(e : NativeSyntheticEvent<NativeTouchEvent>) => deleteAlert(id, fcmTokenAdminId!)}
            />
        }

        return <Icon 
            name="trash-outline" 
            size={30} 
            color={appTextColour} 
            style={delIcon}
            onPress={(e : NativeSyntheticEvent<NativeTouchEvent>) => deleteAlert(id, fcmTokenAdminId!)}
        />                          
    }

    render() {
        const { 
            country, 
            type, 
            condition, 
            value, 
            deleteAlert, 
            id, 
            fcmTokenAdminId, 
            countrySlug, 
            alertPendingDelete 
        } = this.props;

        console.log('id: ')
        console.log(id)
        
        return (
            <View style={border}>
                <View style={container}>
        
                    <View style={imageColumn}>
                        <Image
                            style={image}
                            source={ renderIcon(countrySlug) }
                        />
                    </View>
                    <View style={textColumn}>
                        <View style={headingWrap}>
                            <Text style={heading}>
                                {country}
                            </Text>
                        </View>
                        <View style={dataWrap}>
                            <Icon
                                name='alert-circle-outline'
                                size={24}
                                color={appTextColour}
                                style={{textAlign: 'center'}}
                            />
                            <Text style={dataHeadingText}>{generateAlertMessage(type, condition, value)}</Text>
                        </View>
                        <View>
                            {this.generateIcon()}
                        </View>
                    </View>
                </View> 
            </View>
        );
    }

} 


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    fcmTokenAdminId: selectFirebaseTokenId,
    alertFlow: selectDeleteAlertFlow,
    alertPendingDelete: selectAlertPendingDelete
});

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    deleteAlert: (alertId : number, fcmTokAdminId : number) => dispatch<any>(deleteAlert(alertId, fcmTokAdminId)),
    resetDeleteAlertFlow: () => dispatch(resetDeleteAlertFlow())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertSummary);

