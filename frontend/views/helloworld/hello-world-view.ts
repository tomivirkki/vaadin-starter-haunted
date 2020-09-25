import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-text-field/vaadin-email-field';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';

import { showNotification } from '@vaadin/flow-frontend/a-notification';

import { EndpointError } from '@vaadin/flow-frontend/Connect';
import * as PersonEndpoint from '../../generated/PersonEndpoint';
import PersonModel from '../../generated/com/example/application/data/entity/PersonModel';
import { Binder, field } from '@vaadin/form';

import styles from './hello-world-view.module.css';
import { virtual, html } from 'haunted';

const countryCodes = [
  '+354',
  '+91',
  '+62',
  '+98',
  '+964',
  '+353',
  '+44',
  '+972',
  '+39',
  '+225',
];

export default virtual(() => {
  // Not sure what the element should be in this case....probably not this
  const binderElement = document.createElement('div');
  const binder = new Binder(binderElement, PersonModel);

  const clearForm = () => binder.clear();

  const save = async () => {
    try {
      await binder.submitTo(PersonEndpoint.update);
      clearForm();
      showNotification('Person details stored.', { position: 'bottom-start' });
    } catch (error) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, {
          position: 'bottom-start',
        });
      } else {
        throw error;
      }
    }
  };

  return html`
    <div class=${styles.host}>
      <h3>Personal information</h3>
      <vaadin-form-layout style="width: 100%;">
        <vaadin-text-field
          label="First name"
          ...="${field(binder.model.firstName)}"
        ></vaadin-text-field>

        <vaadin-text-field
          label="Last name"
          ...="${field(binder.model.lastName)}"
        ></vaadin-text-field>

        <vaadin-date-picker
          label="Birthday"
          ...="${field(binder.model.dateOfBirth)}"
        ></vaadin-date-picker>

        <vaadin-custom-field
          label="Phone number"
          ...="${field(binder.model.phone)}"
        >
          <vaadin-horizontal-layout theme="spacing">
            <vaadin-combo-box
              id="countryCode"
              style="width: 120px;"
              pattern="\\+\\d*"
              placeholder="Country"
              .items=${countryCodes}
              prevent-invalid-input
            ></vaadin-combo-box>
            <vaadin-text-field
              style="flex-grow: 1;"
              pattern="\\d*"
              prevent-invalid-input
            ></vaadin-text-field>
          </vaadin-horizontal-layout>
        </vaadin-custom-field>

        <vaadin-email-field
          label="Email address"
          ...="${field(binder.model.email)}"
        ></vaadin-email-field>

        <vaadin-text-field
          label="Occupation"
          ...="${field(binder.model.occupation)}"
        ></vaadin-text-field>
      </vaadin-form-layout>

      <vaadin-horizontal-layout class=${styles.buttonlayout} theme="spacing">
        <vaadin-button theme="primary" @click="${save}"> Save </vaadin-button>
        <vaadin-button @click="${clearForm}"> Cancel </vaadin-button>
      </vaadin-horizontal-layout>
    </div>
  `;
});
