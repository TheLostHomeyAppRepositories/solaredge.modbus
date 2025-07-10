import Homey, { Device } from 'homey';

export interface Measurement {
  value: string;
  scale: string;
  label: string;
}

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export class Solaredge extends Homey.Device {
  registers: Object = {
    c_manufacturer: [0x9c44, 16, 'STRING', 'Manufacturer'],
    c_model: [0x9c54, 16, 'STRING', 'Model'],
    c_version: [0x9c6c, 8, 'STRING', 'Version'],
    c_serialnumber: [0x9c74, 16, 'STRING', 'Serial'],
    c_deviceaddress: [0x9c84, 1, 'UINT16', 'Modbus ID'],
    c_sunspec_did: [0x9c85, 1, 'UINT16', 'SunSpec DID'],

    current: [0x9c87, 1, 'UINT16', 'Current'],
    l1_current: [0x9c88, 1, 'UINT16', 'L1 Current'],
    l2_current: [0x9c89, 1, 'UINT16', 'L2 Current'],
    l3_current: [0x9c8a, 1, 'UINT16', 'L3 Current'],
    current_scale: [0x9c8b, 1, 'SCALE', 'Current Scale Factor'],

    l1_voltage: [0x9c8c, 1, 'UINT16', 'L1 Voltage'],
    l1_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],
    l2_voltage: [0x9c8d, 1, 'UINT16', 'L2 Voltage'],
    l2_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],
    l3_voltage: [0x9c8e, 1, 'UINT16', 'L3 Voltage'],
    l3_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],
    l1n_voltage: [0x9c8f, 1, 'UINT16', 'L1-N Voltage'],
    l1n_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],
    l2n_voltage: [0x9c90, 1, 'UINT16', 'L2-N Voltage'],
    l2n_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],
    l3n_voltage: [0x9c91, 1, 'UINT16', 'L3-N Voltage'],
    l3n_voltage_scale: [0x9c92, 1, 'SCALE', 'Voltage Scale Factor'],

    power_ac: [0x9c93, 1, 'INT16', 'Power'],
    power_ac_scale: [0x9c94, 1, 'SCALE', 'Power Scale Factor'],

    // "frequency": [0x9c95, 1, 'UINT16', "Frequency"],
    // "frequency_scale": [0x9c96, 1, 'SCALE', "Frequency Scale Factor"],

    // "power_apparent": [0x9c97, 1, 'INT16', "Power [Apparent]"],
    // "power_apparent_scale": [0x9c98, 1, 'SCALE', "Power [Apparent] Scale Factor"],
    // "power_reactive": [0x9c99, 1, 'INT16', "Power [Reactive]"],
    // "power_reactive_scale": [0x9c9a, 1, 'SCALE', "Power [Reactive] Scale Factor"],
    // "power_factor": [0x9c9b, 1, 'INT16', "Power Factor"],
    // "power_factor_scale": [0x9c9c, 1, 'SCALE', "Power Factor Scale Factor"],

    energy_total: [0x9c9d, 2, 'ACC32', 'Total Energy'],
    energy_total_scale: [0x9c9f, 1, 'SCALE', 'Total Energy Scale Factor'],

    current_dc: [0x9ca0, 1, 'UINT16', 'DC Current'],
    current_dc_scale: [0x9ca1, 1, 'SCALE', 'DC Current Scale Factor'],

    voltage_dc: [0x9ca2, 1, 'UINT16', 'DC Voltage'],
    voltage_dc_scale: [0x9ca3, 1, 'SCALE', 'DC Voltage Scale Factor'],

    power_dc: [0x9ca4, 1, 'INT16', 'DC Power'],
    power_dc_scale: [0x9ca5, 1, 'SCALE', 'DC Power Scale Factor'],

    temperature: [0x9ca7, 1, 'INT16', 'Temperature'],
    temperature_scale: [0x9caa, 1, 'SCALE', 'Temperature Scale Factor'],

    status: [0x9cab, 1, 'UINT16', 'Status'],
    vendor_status: [0x9cac, 1, 'UINT16', 'Vendor Status'],

    storage_control_mode: [0xe004, 1, 'UINT16', 'Storage Control Mode'],
    storage_accharge_policy: [0xe005, 1, 'UINT16', 'Storage AC Charge Policy'],
    storage_accharge_Limit: [0xe006, 2, 'FLOAT32', 'Storage AC Charge Limit'],

    remote_control_command_mode: [0xe00d, 1, 'UINT16', 'Remote Control Command Mode'],
    remote_control_charge_limit: [0xe00e, 2, 'FLOAT32', 'Remote Control Charge Limit'],
    remote_control_command_discharge_limit: [0xe010, 2, 'FLOAT32', 'Remote Control Command Discharge Limit'],
    remote_control_command_timeout: [0xe00b, 2, 'UINT32', 'Remote Control Command Timeout'],
    remote_control_default_command_mode: [0xe00a, 1, 'UINT16', 'Storage Charge/Discharge Default Mode'],

    // "rrcr_state": [0xf000, 1, 'UINT16', "RRCR State"],
    active_power_limit: [0xf001, 1, 'UINT16', 'Active Power Limit'],
    // "cosphi": [0xf002, 2, 'FLOAT32', "CosPhi"],

    advancedpwrcontrolen: [0xf142, 2, 'UINT32', 'Advanced Power Control En'],
    reactivepwrconfig: [0xf102, 2, 'UINT32', 'Reactive Power Config'],
    export_control_mode: [0xe000, 1, 'UINT16', 'Export control Mode'],
    export_control_limit_mode: [0xe001, 1, 'UINT16', 'Export control limit Mode'],
    export_control_site: [0xe002, 2, 'FLOAT32', 'Export control site limit'],
    powerreduce: [0xf140, 2, 'FLOAT32', 'Power Reduce'],
    maxcurrent: [0xf18e, 2, 'FLOAT32', 'Max Current'],
  };

  meter_dids: Object = {
    meter1: [0x9cfc, 1, 'UINT16', 0x0],
    // "meter2": [0x9daa, 1, 'UINT16', 0xae],
    // "meter3": [0x9e59, 1, 'UINT16', 0x15c]
  };

  meter_registers: Object = {
    c_manufacturer: [0x9cbb, 16, 'STRING', 'Manufacturer'],
    c_model: [0x9ccb, 16, 'STRING', 'Model'],
    c_option: [0x9cdb, 8, 'STRING', 'Mode'],
    c_version: [0x9ce3, 8, 'STRING', 'Version'],
    c_serialnumber: [0x9ceb, 16, 'STRING', 'Serial'],
    c_deviceaddress: [0x9cfb, 1, 'UINT16', 'Modbus ID'],
    c_sunspec_did: [0x9cfc, 1, 'UINT16', 'SunSpec DID'],

    current: [0x9cfe, 1, 'INT16', 'Current'],
    l1_current: [0x9cff, 1, 'INT16', 'L1 Current'],
    l2_current: [0x9d00, 1, 'INT16', 'L2 Current'],
    l3_current: [0x9d01, 1, 'INT16', 'L3 Current'],
    current_scale: [0x9d02, 1, 'SCALE', 'Current Scale Factor'],

    voltage_ln: [0x9d03, 1, 'INT16', 'L-N Voltage'],
    l1n_voltage: [0x9d04, 1, 'INT16', 'L1-N Voltage'],
    l2n_voltage: [0x9d05, 1, 'INT16', 'L2-N Voltage'],
    l3n_voltage: [0x9d06, 1, 'INT16', 'L3-N Voltage'],
    voltage_ll: [0x9d07, 1, 'INT16', 'L-L Voltage'],
    l12_voltage: [0x9d08, 1, 'INT16', 'L1-l2 Voltage'],
    l23_voltage: [0x9d09, 1, 'INT16', 'L2-l3 Voltage'],
    l31_voltage: [0x9d0a, 1, 'INT16', 'L3-l1 Voltage'],
    voltage_ln_scale: [0x9d0b, 1, 'SCALE', 'Voltage Scale Factor'],

    frequency: [0x9d0c, 1, 'INT16', 'Frequency'],
    frequency_scale: [0x9d0d, 1, 'SCALE', 'Frequency Scale Factor'],

    power: [0x9d0e, 1, 'INT16', 'Power'],
    l1_power: [0x9d0f, 1, 'INT16', 'L1 Power'],
    l2_power: [0x9d10, 1, 'INT16', 'L2 Power'],
    l3_power: [0x9d11, 1, 'INT16', 'L3 Power'],
    power_scale: [0x9d12, 1, 'SCALE', 'Power Scale Factor'],

    // "power_apparent": [0x9d13, 1, 'INT16', "Power (Apparent)"],
    // "l1_power_apparent": [0x9d14, 1, 'INT16', "L1 Power (Apparent)"],
    // "l2_power_apparent": [0x9d15, 1, 'INT16', "L2 Power (Apparent)"],
    // "l3_power_apparent": [0x9d16, 1, 'INT16', "L3 Power (Apparent)"],
    // "power_apparent_scale": [0x9d17, 1, 'SCALE', "Power (Apparent) Scale Factor"],

    // "power_reactive": [0x9d18, 1, 'INT16', "Power (Reactive)"],
    // "l1_power_reactive": [0x9d19, 1, 'INT16', "L1 Power (Reactive)"],
    // "l2_power_reactive": [0x9d1a, 1, 'INT16', "L2 Power (Reactive)"],
    // "l3_power_reactive": [0x9d1b, 1, 'INT16', "L3 Power (Reactive)"],
    // "power_reactive_scale": [0x9d1c, 1, 'SCALE', "Power (Reactive) Scale Factor"],

    // "power_factor": [0x9d1d, 1, 'INT16', "Power Factor"],
    // "l1_power_factor": [0x9d1e, 1, 'INT16', "L1 Power Factor"],
    // "l2_power_factor": [0x9d1f, 1, 'INT16', "L2 Power Factor"],
    // "l3_power_factor": [0x9d20, 1, 'INT16', "L3 Power Factor"],
    // "power_factor_scale": [0x9d21, 1, 'SCALE', "Power Factor Scale Factor"],

    export_energy_active: [0x9d22, 2, 'UINT32', 'Total Exported Energy (Active)'],
    l1_export_energy_active: [0x9d24, 2, 'UINT32', 'L1 Exported Energy (Active)'],
    l2_export_energy_active: [0x9d26, 2, 'UINT32', 'L2 Exported Energy (Active)'],
    l3_export_energy_active: [0x9d28, 2, 'UINT32', 'L3 Exported Energy (Active)'],
    import_energy_active: [0x9d2a, 2, 'UINT32', 'Total Imported Energy (Active)'],
    l1_import_energy_active: [0x9d2c, 2, 'UINT32', 'L1 Imported Energy (Active)'],
    l2_import_energy_active: [0x9d2e, 2, 'UINT32', 'L2 Imported Energy (Active)'],
    l3_import_energy_active: [0x9d30, 2, 'UINT32', 'L3 Imported Energy (Active)'],
    export_energy_active_scale: [0x9d32, 1, 'SCALE', 'Energy (Active) Scale Factor'],

    // "export_energy_apparent": [0x9d33, 2, 'UINT32', "Total Exported Energy (Apparent)"],
    // "l1_export_energy_apparent": [0x9d35, 2, 'UINT32', "L1 Exported Energy (Apparent)"],
    // "l2_export_energy_apparent": [0x9d37, 2, 'UINT32', "L2 Exported Energy (Apparent)"],
    // "l3_export_energy_apparent": [0x9d39, 2, 'UINT32', "L3 Exported Energy (Apparent)"],
    // "import_energy_apparent": [0x9d3b, 2, 'UINT32', "Total Imported Energy (Apparent)"],
    // "l1_import_energy_apparent": [0x9d3d, 2, 'UINT32', "L1 Imported Energy (Apparent)"],
    // "l2_import_energy_apparent": [0x9d3f, 2, 'UINT32', "L2 Imported Energy (Apparent)"],
    // "l3_import_energy_apparent": [0x9d41, 2, 'UINT32', "L3 Imported Energy (Apparent)"],
    // "export_energy_apparent_scale": [0x9d43, 1, 'SCALE', "Energy (Apparent) Scale Factor"],

    // "import_energy_reactive_q1": [0x9d44, 2, 'UINT32', "Total Imported Energy (Reactive) Quadrant 1"],
    // "l1_import_energy_reactive_q1": [0x9d46, 2, 'UINT32', "L1 Imported Energy (Reactive) Quadrant 1"],
    // "l2_import_energy_reactive_q1": [0x9d48, 2, 'UINT32', "L2 Imported Energy (Reactive) Quadrant 1"],
    // "l3_import_energy_reactive_q1": [0x9d4a, 2, 'UINT32', "L3 Imported Energy (Reactive) Quadrant 1"],
    // "import_energy_reactive_q2": [0x9d4c, 2, 'UINT32', "Total Imported Energy (Reactive) Quadrant 2"],
    // "l1_import_energy_reactive_q2": [0x9d4e, 2, 'UINT32', "L1 Imported Energy (Reactive) Quadrant 2"],
    // "l2_import_energy_reactive_q2": [0x9d50, 2, 'UINT32', "L2 Imported Energy (Reactive) Quadrant 2"],
    // "l3_import_energy_reactive_q2": [0x9d52, 2, 'UINT32', "L3 Imported Energy (Reactive) Quadrant 2"],
    // "export_energy_reactive_q3": [0x9d54, 2, 'UINT32', "Total Exported Energy (Reactive) Quadrant 3"],
    // "l1_export_energy_reactive_q3": [0x9d56, 2, 'UINT32', "L1 Exported Energy (Reactive) Quadrant 3"],
    // "l2_export_energy_reactive_q3": [0x9d58, 2, 'UINT32', "L2 Exported Energy (Reactive) Quadrant 3"],
    // "l3_export_energy_reactive_q3": [0x9d5a, 2, 'UINT32', "L3 Exported Energy (Reactive) Quadrant 3"],
    // "export_energy_reactive_q4": [0x9d5c, 2, 'UINT32', "Total Exported Energy (Reactive) Quadrant 4"],
    // "l1_export_energy_reactive_q4": [0x9d5e, 2, 'UINT32', "L1 Exported Energy (Reactive) Quadrant 4"],
    // "l2_export_energy_reactive_q4": [0x9d60, 2, 'UINT32', "L2 Exported Energy (Reactive) Quadrant 4"],
    // "l3_export_energy_reactive_q4": [0x9d62, 2, 'UINT32', "L3 Exported Energy (Reactive) Quadrant 4"],
    // "import_energy_reactive_q1_scale": [0x9d64, 1, 'SCALE', "Energy (Reactive) Scale Factor"]
  };

  battery_dids: Object = {
    batt1: [0xe140, 1, 'UINT16', 0x0],
    batt2: [0xe240, 1, 'UINT16', 0x100],
  };

  batt_registers: Object = {
    c_manufacturer: [0xe100, 16, 'STRING', 'Manufacturer'],
    c_model: [0xe110, 16, 'STRING', 'Model'],
    c_version: [0xe120, 16, 'STRING', 'Version'],
    c_serialnumber: [0xe130, 16, 'STRING', 'Serial'],
    c_deviceaddress: [0xe140, 1, 'UINT16', 'Modbus ID'],
    c_sunspec_did: [0xe141, 1, 'UINT16', 'SunSpec DID'],

    rated_energy: [0xe142, 2, 'SEFLOAT', 'Rated Energy'],
    maximum_charge_continuous_power: [0xe144, 2, 'SEFLOAT', 'Maximum Charge Continuous Power'],
    maximum_discharge_continuous_power: [0xe146, 2, 'SEFLOAT', 'Maximum Discharge Continuous Power'],
    maximum_charge_peak_power: [0xe148, 2, 'SEFLOAT', 'Maximum Charge Peak Power'],
    maximum_discharge_peak_power: [0xe14a, 2, 'SEFLOAT', 'Maximum Discharge Peak Power'],

    average_temperature: [0xe16c, 2, 'SEFLOAT', 'Average Temperature'],
    maximum_temperature: [0xe16e, 2, 'SEFLOAT', 'Maximum Temperature'],

    instantaneous_voltage: [0xe170, 2, 'SEFLOAT', 'Instantaneous Voltage'],
    instantaneous_current: [0xe172, 2, 'SEFLOAT', 'Instantaneous Current'],
    instantaneous_power: [0xe174, 2, 'SEFLOAT', 'Instantaneous Power'],

    lifetime_export_energy_counter: [0xe176, 4, 'UINT64', 'Total Exported Energy'],
    lifetime_import_energy_counter: [0xe17a, 4, 'UINT64', 'Total Imported Energy'],

    maximum_energy: [0xe17e, 2, 'SEFLOAT', 'Maximum Energy'],
    available_energy: [0xe180, 2, 'SEFLOAT', 'Available Energy'],

    soh: [0xe182, 2, 'SEFLOAT', 'State of Health [SOH)'],
    soe: [0xe184, 2, 'SEFLOAT', 'State of Energy [SOE)'],

    status: [0xe186, 2, 'UINT32', 'Status'],
    status_internal: [0xe188, 2, 'UINT32', 'Internal Status'],

    event_log: [0xe18a, 2, 'UINT16', 'Event Log'],
    event_log_internal: [0xe192, 2, 'UINT16', 'Internal Event Log'],
  };

  validResultRecord(entry: Measurement) {
    if (entry && entry.value && entry.value != 'xxx' && entry.scale) {
      return true;
    }
    return false;
  }

  validResultScaleRecord(entry: Measurement) {
    if (entry && entry.scale) {
      return true;
    }
    return false;
  }

  async processResult(result: Record<string, Measurement>, maxpeakpower: number) {
    if (result) {
      // result
      for (const k in result) {
        console.log('solaredge: ', k, result[k].value, result[k].scale, result[k].label);
      }

      if (this.validResultRecord(result['power_ac'])) {
        if (this.hasCapability('measure_power') === false) {
           await this.addCapability('measure_power');
        }   
        var acpower = Number(result['power_ac'].value) * Math.pow(10, Number(result['power_ac'].scale));
        if (maxpeakpower > 0 && acpower > maxpeakpower) {
          // skip
          console.log(`skip measure_power, max: ${maxpeakpower} power: ${acpower}`);
        } else {
          this.setCapabilityValue('measure_power', Math.round(acpower));
        }
      }

      if (this.validResultRecord(result['current'])) {
        if (this.hasCapability('measure_current') === false) {
           await this.addCapability('measure_current');
        }   
        var currenteac = Number(result['current'].value) * Math.pow(10, Number(result['current'].scale));
        this.setCapabilityValue('measure_current', currenteac);
      }
      if (this.validResultRecord(result['l1_current']) && this.validResultScaleRecord(result['current']) && result['l1_current'].value != '-1') {
        if (this.hasCapability('measure_current.phase1') === false) {
           await this.addCapability('measure_current.phase1');
        }   
        var currenteac1 = Number(result['l1_current'].value) * Math.pow(10, Number(result['current'].scale));
        this.setCapabilityValue('measure_current.phase1', currenteac1);
      }
      if (this.validResultRecord(result['l2_current']) && this.validResultScaleRecord(result['current']) && result['l2_current'].value != '-1') {
        if (this.hasCapability('measure_current.phase2') === false) {
           await this.addCapability('measure_current.phase2');
        }   
        var currenteac2 = Number(result['l2_current'].value) * Math.pow(10, Number(result['current'].scale));
        this.setCapabilityValue('measure_current.phase2', currenteac2);
      }
      if (this.validResultRecord(result['l3_current']) && this.validResultScaleRecord(result['current']) && result['l3_current'].value != '-1') {
        if (this.hasCapability('measure_current.phase3') === false) {
           await this.addCapability('measure_current.phase3');
        }   
        var currenteac3 = Number(result['l3_current'].value) * Math.pow(10, Number(result['current'].scale));
        this.setCapabilityValue('measure_current.phase3', currenteac3);
      }

      if (this.validResultRecord(result['l1_voltage']) && this.validResultScaleRecord(result['l1_voltage']) && result['l1_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase1') === false) {
           await this.addCapability('measure_voltage.phase1');
        }   
        const voltagel1 = Number(result['l1_voltage'].value) * Math.pow(10, Number(result['l1_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase1', voltagel1);
      }
      if (this.validResultRecord(result['l2_voltage']) && this.validResultScaleRecord(result['l2_voltage']) && result['l2_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase2') === false) {
           await this.addCapability('measure_voltage.phase2');
        }   
        const voltagel2 = Number(result['l2_voltage'].value) * Math.pow(10, Number(result['l2_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase2', voltagel2);
      }
      if (this.validResultRecord(result['l3_voltage']) && this.validResultScaleRecord(result['l3_voltage']) && result['l3_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase3') === false) {
           await this.addCapability('measure_voltage.phase3');
        }   
        const voltagel3 = Number(result['l3_voltage'].value) * Math.pow(10, Number(result['l3_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase3', voltagel3);
      }

      if (this.validResultRecord(result['l1n_voltage']) && this.validResultScaleRecord(result['l1n_voltage']) && result['l1n_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase1n') === false) {
           await this.addCapability('measure_voltage.phase1n');
        }   
        const voltagel1n = Number(result['l1n_voltage'].value) * Math.pow(10, Number(result['l1n_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase1n', voltagel1n);
      }
      if (this.validResultRecord(result['l2n_voltage']) && this.validResultScaleRecord(result['l2n_voltage']) && result['l2n_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase2n') === false) {
           await this.addCapability('measure_voltage.phase2n');
        }   
        const voltagel2n = Number(result['l2n_voltage'].value) * Math.pow(10, Number(result['l2n_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase2n', voltagel2n);
      }
      if (this.validResultRecord(result['l3n_voltage']) && this.validResultScaleRecord(result['l3n_voltage']) && result['l3n_voltage'].value != '-1') {
        if (this.hasCapability('measure_voltage.phase3n') === false) {
           await this.addCapability('measure_voltage.phase3n');
        }   
        const voltagel3n = Number(result['l3n_voltage'].value) * Math.pow(10, Number(result['l3n_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase3n', voltagel3n);
      }

      const tz = this.homey.clock.getTimezone();
      const now = new Date().toLocaleString(this.homey.i18n.getLanguage(), {
        hour12: false,
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
      });

      if (this.validResultRecord(result['energy_total'])) {
        if (this.hasCapability('meter_power') === false) {
           await this.addCapability('meter_power');
        }   
        const total = Number(result['energy_total'].value) * Math.pow(10, Number(result['energy_total'].scale));
        this.setCapabilityValue('meter_power', total / 1000);
        console.log(now);
        if (total != null) {
          if (this.getStoreValue('daily') == null) {
            this.setStoreValue('daily', total / 1000);
          } else if (now == '24:01' || now == '24:02' || now == '00:01' || now == '00:02') {
            console.log('reset');
            console.log(total / 1000);
            this.setStoreValue('daily', total / 1000);
          }
          if (this.getStoreValue('daily') != null) {
            const daily_power = Number((total / 1000 - this.getStoreValue('daily')).toFixed(2));
            console.log(`daily: ${daily_power}`);
            if (this.hasCapability('meter_power.daily') === false) {
              await this.addCapability('meter_power.daily');
            }   
            if (this.getCapabilityValue('meter_power.daily') != daily_power) {
              const tokens = {
                'meter_power.daily': daily_power,
              };
              this.homey.flow.getDeviceTriggerCard('meter_power_day_changed').trigger(this, tokens);
            }
            if (daily_power > 0) {
              this.setCapabilityValue('meter_power.daily', daily_power);
            } else {
              this.setCapabilityValue('meter_power.daily', 0);
            }
          }
        }
      }

      // if (result['power_dc'] && result['power_dc'].value != 'xxx' ){
      //   this.addCapability('measure_voltage.dc');
      //   var dcpower = Number(result['power_dc'].value)*(Math.pow(10, Number(result['power_dc'].scale)));
      //   this.setCapabilityValue('measure_voltage.dc', dcpower);
      // }

      if (this.validResultRecord(result['temperature'])) {
        if (this.hasCapability('measure_temperature.invertor') === false) {
           await this.addCapability('measure_temperature.invertor');
        }   
        const temperature = Number((Number(result['temperature'].value) * Math.pow(10, Number(result['temperature'].scale))).toFixed(2));

        if (this.getCapabilityValue('measure_temperature.invertor') != temperature) {
          const tokens = {
            'measure_temperature.invertor': temperature,
          };
          this.homey.flow.getDeviceTriggerCard('measure_temperature_inverter_changed').trigger(this, tokens);
        }
        this.setCapabilityValue('measure_temperature.invertor', temperature);
      }

      if (this.validResultRecord(result['active_power_limit'])) {
        if (this.hasCapability('activepowerlimit') === false) {
           await this.addCapability('activepowerlimit');
        }   
        var power_limit = Number(result['active_power_limit'].value);
        this.setCapabilityValue('activepowerlimit', power_limit);
      }

      if (this.validResultRecord(result['powerreduce']) && this.hasCapability('powerreduce')) {
        if (this.hasCapability('powerreduce') === false) {
           await this.addCapability('powerreduce');
        }   
        var power_limit = Number(result['powerreduce'].value);
        this.setCapabilityValue('powerreduce', power_limit);
      }

      if (this.validResultRecord(result['export_control_mode'])) {
        if (this.hasCapability('limitcontrolmode')) {
          this.addCapability('limitcontrolmode');
          let mode = '0';
          if (result['export_control_mode'].value == '1') {
            mode = '1';
          } else if (result['export_control_mode'].value == '4') {
            mode = '2';
          } else if (result['export_control_mode'].value == '2049') {
            mode = '11';
          }
          this.setCapabilityValue('limitcontrolmode', mode);
        }
      }

      if (this.validResultRecord(result['export_control_limit_mode'])) {
        if (this.hasCapability('exportcontrollimitmode')) {
          this.addCapability('exportcontrollimitmode');
          this.setCapabilityValue('exportcontrollimitmode', result['export_control_limit_mode'].value);
        }
      }
      if (this.validResultRecord(result['export_control_site'])) {
        if (this.hasCapability('exportcontrolsitelimit')) {
          this.addCapability('exportcontrolsitelimit');
          if (Number(result['export_control_site'].value) > 0) {
            this.setCapabilityValue('exportcontrolsitelimit', Number(result['export_control_site'].value));
          } else {
            this.setCapabilityValue('exportcontrolsitelimit', 0);
          }
        }
      }

      if (this.validResultRecord(result['status'])) {
        if (parseInt(result['status'].value) < 9) {
          if (this.hasCapability('invertorstatus') === false) {
            await this.addCapability('invertorstatus');
          }   

          if (this.getCapabilityValue('invertorstatus') != result['status'].value) {
            const status_str: { [key: string]: string } = {
              0: 'Undefined',
              1: 'Off',
              2: 'Sleeping',
              3: 'Grid Monitoring',
              4: 'Producing',
              5: 'Producing (Throttled)',
              6: 'Shutting Down',
              7: 'Fault',
              8: 'Maintenance',
            };
            // console.log(this.driver.id);
            // console.log(status_str[result['status'].value]);
            this.setCapabilityValue('invertorstatus', result['status'].value);
            sleep().then(() => {
              this.homey.flow.getDeviceTriggerCard('changedStatus').trigger(this, { status: status_str[result['status'].value] }, {});
            });
          }
          this.setCapabilityValue('invertorstatus', result['status'].value);
        }
      }

      // meters
      if (this.validResultRecord(result['meter1-export_energy_active'])) {
        if (this.hasCapability('meter_power.export') === false) {
          await this.addCapability('meter_power.export');
        }   
        const totalexport = Number(result['meter1-export_energy_active'].value) * Math.pow(10, Number(result['meter1-export_energy_active'].scale));
        this.setCapabilityValue('meter_power.export', totalexport / 1000);
      }

      if (this.validResultRecord(result['meter1-import_energy_active']) && this.validResultScaleRecord(result['meter1-export_energy_active'])) {
        if (this.hasCapability('meter_power.import') === false) {
          await this.addCapability('meter_power.import');
        }  
        const totalimport = Number(result['meter1-import_energy_active'].value) * Math.pow(10, Number(result['meter1-export_energy_active'].scale));
        this.setCapabilityValue('meter_power.import', totalimport / 1000);
      }

      if (this.validResultRecord(result['meter1-voltage_ln']) && this.validResultScaleRecord(result['meter1-voltage_ln'])) {
        if (this.hasCapability('measure_voltage.meter') === false) {
          await this.addCapability('measure_voltage.meter');
        }  
        const voltageac = Number(result['meter1-voltage_ln'].value) * Math.pow(10, Number(result['meter1-voltage_ln'].scale));
        this.setCapabilityValue('measure_voltage.meter', voltageac);
      }

      if (this.validResultRecord(result['meter1-current'])) {
        if (this.hasCapability('measure_current.meter') === false) {
          await this.addCapability('measure_current.meter');
        }  
        var currenteac = Number(result['meter1-current'].value) * Math.pow(10, Number(result['meter1-current'].scale));
        this.setCapabilityValue('measure_current.meter', currenteac);
      }

      if (this.validResultRecord(result['meter1-l1_current']) && this.validResultScaleRecord(result['meter1-current'])) {
        if (this.hasCapability('measure_current.meter_phase1') === false) {
          await this.addCapability('measure_current.meter_phase1');
        }  
        var currenteac1 = Number(result['meter1-l1_current'].value) * Math.pow(10, Number(result['meter1-current'].scale));
        this.setCapabilityValue('measure_current.meter_phase1', currenteac1);
      }

      if (this.validResultRecord(result['meter1-l2_current']) && this.validResultScaleRecord(result['meter1-current'])) {
        if (this.hasCapability('measure_current.meter_phase2') === false) {
          await this.addCapability('measure_current.meter_phase2');
        }  
        var currenteac2 = Number(result['meter1-l2_current'].value) * Math.pow(10, Number(result['meter1-current'].scale));
        this.setCapabilityValue('measure_current.meter_phase2', currenteac2);
      }

      if (this.validResultRecord(result['meter1-l3_current']) && this.validResultScaleRecord(result['meter1-current'])) {
        if (this.hasCapability('measure_current.meter_phase3') === false) {
          await this.addCapability('measure_current.meter_phase3');
        }  
        var currenteac3 = Number(result['meter1-l3_current'].value) * Math.pow(10, Number(result['meter1-current'].scale));
        this.setCapabilityValue('measure_current.meter_phase3', currenteac3);
      }

      if (this.validResultRecord(result['meter1-l1n_voltage']) && this.validResultRecord(result['meter1-voltage_ln_scale'])) {
        if (this.hasCapability('measure_voltage.meter_phase1') === false) {
          await this.addCapability('measure_voltage.meter_phase1');
        }  
        const voltageeac1 = Number(result['meter1-l1n_voltage'].value) * Math.pow(10, Number(result['meter1-voltage_ln_scale'].value));
        console.log(voltageeac1);
        this.setCapabilityValue('measure_voltage.meter_phase1', voltageeac1);
      }

      if (this.validResultRecord(result['meter1-l2n_voltage']) && this.validResultRecord(result['meter1-voltage_ln_scale'])) {
        if (this.hasCapability('measure_voltage.meter_phase2') === false) {
          await this.addCapability('measure_voltage.meter_phase2');
        }  
        const voltageeac2 = Number(result['meter1-l2n_voltage'].value) * Math.pow(10, Number(result['meter1-voltage_ln_scale'].value));
        this.setCapabilityValue('measure_voltage.meter_phase2', voltageeac2);
      }

      if (this.validResultRecord(result['meter1-l3n_voltage']) && this.validResultRecord(result['meter1-voltage_ln_scale'])) {
        if (this.hasCapability('measure_voltage.meter_phase3') === false) {
          await this.addCapability('measure_voltage.meter_phase3');
        }  
        const voltageeac3 = Number(result['meter1-l3n_voltage'].value) * Math.pow(10, Number(result['meter1-voltage_ln_scale'].value));
        this.setCapabilityValue('measure_voltage.meter_phase3', voltageeac3);
      }

      if (this.validResultRecord(result['meter1-power']) && this.validResultRecord(result['meter1-power'])) {
        if (this.hasCapability('measure_power.import') === false) {
          await this.addCapability('measure_power.import');
        }  
        if (this.hasCapability('measure_power.export') === false) {
          await this.addCapability('measure_power.export');
        }          
        if (this.hasCapability('ownconsumption') === false) {
          await this.addCapability('ownconsumption');
        }  
        var acpower = Number(result['power_ac'].value) * Math.pow(10, Number(result['power_ac'].scale));
        const meterpower = Number(result['meter1-power'].value) * Math.pow(10, Number(result['meter1-power'].scale));
        console.log(`acpower: ${acpower}`);
        console.log(`meterpower: ${meterpower}`);
        if (meterpower > 0) {
          this.setCapabilityValue('measure_power.export', meterpower);
          this.setCapabilityValue('measure_power.import', 0);
          this.setCapabilityValue('ownconsumption', acpower - meterpower);
          console.log(`export: ${meterpower}`);
          console.log(`import: ${0}`);
          console.log(`ownconsumption: ${acpower - meterpower}`);
          this.homey.flow.getDeviceTriggerCard('changedExportPower').trigger(this, { 'measure_power.export': meterpower }, {});
          this.homey.flow.getDeviceTriggerCard('changedImportPower').trigger(this, { 'measure_power.import': 0 }, {});
          this.homey.flow.getDeviceTriggerCard('changedConsumption').trigger(this, { ownconsumption: acpower - meterpower }, {});
        } else {
          this.setCapabilityValue('measure_power.export', 0);
          this.setCapabilityValue('measure_power.import', -1 * meterpower);
          this.setCapabilityValue('ownconsumption', acpower + -1 * meterpower);
          console.log(`export: ${0}`);
          console.log(`import: ${-1 * meterpower}`);
          console.log(`ownconsumption: ${acpower + -1 * meterpower}`);
          this.homey.flow.getDeviceTriggerCard('changedExportPower').trigger(this, { 'measure_power.export': 0 }, {});
          this.homey.flow.getDeviceTriggerCard('changedImportPower').trigger(this, { 'measure_power.import': -1 * meterpower }, {});
          this.homey.flow.getDeviceTriggerCard('changedConsumption').trigger(this, { ownconsumption: acpower + -1 * meterpower }, {});
        }
      }

      // battery
      if (this.validResultRecord(result['batt1-instantaneous_power'])) {
        if (this.hasCapability('measure_power.batt_charge') === false) {
          await this.addCapability('measure_power.batt_charge');
        }  
        if (this.hasCapability('measure_power.batt_discharge') === false) {
          await this.addCapability('measure_power.batt_discharge');
        }          
        var battpower = Number(result['batt1-instantaneous_power'].value);
        if (battpower > 0 || battpower == 0) {
          this.setCapabilityValue('measure_power.batt_charge', battpower);
          this.setCapabilityValue('measure_power.batt_discharge', 0);
        } else {
          this.setCapabilityValue('measure_power.batt_charge', 0);
          this.setCapabilityValue('measure_power.batt_discharge', -1 * battpower);
        }
      }

      if (this.validResultRecord(result['batt1-soe'])) {
        if (this.hasCapability('battery') === false) {
          await this.addCapability('battery');
        }  
        if (this.hasCapability('measure_battery') === false) {
          await this.addCapability('measure_battery');
        }  
        var battery = Number(Number.parseFloat(result['batt1-soe'].value).toFixed(2));
        if (battery > 0) {
          if (this.validResultRecord(result['batt2-soe'])) {
            console.log('2 batteries');
            const battery2 = Number(Number.parseFloat(result['batt2-soe'].value).toFixed(2));
            const bothBattery = (battery + battery2) / 2;
            if (this.getCapabilityValue('battery') != bothBattery) {
              this.homey.flow.getDeviceTriggerCard('changedBattery').trigger(this, { charge: bothBattery }, {});
            }
            this.setCapabilityValue('battery', battery);
            this.setCapabilityValue('measure_battery', bothBattery);
          } else {
            console.log('single batteries');
            if (this.getCapabilityValue('battery') != battery) {
              this.homey.flow.getDeviceTriggerCard('changedBattery').trigger(this, { charge: battery }, {});
            }
            this.setCapabilityValue('battery', battery);
            this.setCapabilityValue('measure_battery', battery);

            if (this.hasCapability('measure_power.batt_charge2') === true) {
              this.removeCapability('measure_power.batt_charge2');
            }
            if (this.hasCapability('measure_power.batt_discharge2') === true) {
              this.removeCapability('measure_power.batt_discharge2');
            }
            if (this.hasCapability('measure_temperature.battery2') === true) {
              this.removeCapability('measure_temperature.battery2');
            }
            if (this.hasCapability('battery2') === true) {
              this.removeCapability('battery2');
            }
            if (this.hasCapability('batterysoh2') === true) {
              this.removeCapability('batterysoh2');
            }
            if (this.hasCapability('battstatus2') === true) {
              this.removeCapability('battstatus2');
            }
            if (this.hasCapability('batterycap2') === true) {
              this.removeCapability('batterycap2');
            }
            if (this.hasCapability('batterymaxcap2') === true) {
              this.removeCapability('batterymaxcap2');
            }
          }
        }
      }

      if (this.validResultRecord(result['batt1-soh'])) {
        var health = Number(result['batt1-soh'].value);
        this.setCapabilityValue('batterysoh', health);
      }

      if (this.validResultRecord(result['batt2-instantaneous_power'])) {
        if (this.hasCapability('measure_power.batt_charge2') === false) {
          await this.addCapability('measure_power.batt_charge2');
        }  
        if (this.hasCapability('measure_power.batt_discharge2') === false) {
          await this.addCapability('measure_power.batt_discharge2');
        }  
        var battpower = Number(result['batt2-instantaneous_power'].value);
        if (battpower > 0 || battpower == 0) {
          this.setCapabilityValue('measure_power.batt_charge2', battpower);
          this.setCapabilityValue('measure_power.batt_discharge2', 0);
        } else {
          this.setCapabilityValue('measure_power.batt_charge2', 0);
          this.setCapabilityValue('measure_power.batt_discharge2', -1 * battpower);
        }
      }

      if (this.validResultRecord(result['batt2-soe'])) {
        if (this.hasCapability('battery2') === false) {
          await this.addCapability('battery2');
        }  
        var battery = Number(Number.parseFloat(result['batt2-soe'].value).toFixed(2));
        if (battery > 0) {
          this.setCapabilityValue('battery2', battery);
        }
      }

      if (this.validResultRecord(result['batt2-soh'])) {
        if (this.hasCapability('batterysoh2') === false) {
          await this.addCapability('batterysoh2');
        }  
        var health = Number(result['batt2-soh'].value);
        this.setCapabilityValue('batterysoh2', health);
      }

      if (this.validResultRecord(result['batt1-soh'])) {
        if (this.validResultRecord(result['storage_control_mode'])) {
          if (this.hasCapability('storagecontrolmode') === false) {
            await this.addCapability('storagecontrolmode');
          }  
          const storagecontrolmode = result['storage_control_mode'].value;
          console.log(`changedStoragecontrolmode old ${this.getCapabilityValue('storagecontrolmode')}`);
          console.log(`changedStoragecontrolmode new ${storagecontrolmode}`);
          if (this.getCapabilityValue('storagecontrolmode') != storagecontrolmode) {
            const tokens = {
              mode: Number(storagecontrolmode),
            };
            const state = {};
            console.log(`trigger changedStoragecontrolmode ${storagecontrolmode}`);
            this.setCapabilityValue('storagecontrolmode', storagecontrolmode);
            sleep().then(() => {
              this.homey.flow.getDeviceTriggerCard('changedStoragecontrolmode').trigger(this, tokens, state);
            });
          }
          this.setCapabilityValue('storagecontrolmode', storagecontrolmode);
        }

        if (this.validResultRecord(result['storage_accharge_policy'])) {
          if (this.hasCapability('storageacchargepolicy') === false) {
            await this.addCapability('storageacchargepolicy');
          }  
          const storageacchargepolicy = result['storage_accharge_policy'].value;
          this.setCapabilityValue('storageacchargepolicy', storageacchargepolicy);
        }

        if (this.validResultRecord(result['remote_control_command_mode'])) {
          if (this.hasCapability('storagedefaultmode') === false) {
            await this.addCapability('storagedefaultmode');
          }  
          const storagedefaultmode = result['remote_control_command_mode'].value;
          if (this.getCapabilityValue('storagedefaultmode') != storagedefaultmode) {
            const tokens = {
              mode: Number(storagedefaultmode),
            };
            const state = {};
            console.log(`trigger changedStoragedefaultmode ${storagedefaultmode}`);
            this.setCapabilityValue('storagedefaultmode', storagedefaultmode);
            sleep().then(() => {
              this.homey.flow.getDeviceTriggerCard('changedStoragedefaultmode').trigger(this, tokens, state);
            });
          }
          this.setCapabilityValue('storagedefaultmode', storagedefaultmode);
        }

        if (this.validResultRecord(result['remote_control_charge_limit'])) {
          if (this.hasCapability('measure_power.chargesetting') === false) {
            await this.addCapability('measure_power.chargesetting');
          }  
          const chargeLimit = Number(result['remote_control_charge_limit'].value);
          this.setCapabilityValue('measure_power.chargesetting', chargeLimit);
        }

        if (this.validResultRecord(result['remote_control_command_discharge_limit'])) {
          if (this.hasCapability('measure_power.dischargesetting') === false) {
            await this.addCapability('measure_power.dischargesetting');
          }  
          const dischargeLimit = Number(result['remote_control_command_discharge_limit'].value);
          this.setCapabilityValue('measure_power.dischargesetting', dischargeLimit);
        }
      }

      if (this.validResultRecord(result['batt1-average_temperature'])) {
        if (this.hasCapability('measure_temperature.battery') === false) {
          await this.addCapability('measure_temperature.battery');
        }  
        var batt_temperature = Number(result['batt1-average_temperature'].value);
        this.setCapabilityValue('measure_temperature.battery', Math.round(batt_temperature));
      }

      if (this.validResultRecord(result['batt1-status'])) {
        if (parseInt(result['batt1-status'].value) < 11) {
          if (this.hasCapability('battstatus') === false) {
            await this.addCapability('battstatus');
          }  
          if (this.getCapabilityValue('battstatus') != result['batt1-status'].value) {
            const status_str: { [key: string]: string } = {
              0: 'Off',
              1: 'Standby',
              2: 'Init',
              3: 'Charge',
              4: 'Discharge',
              5: 'Fault',
              6: 'Idle',
              7: 'Idle',
              10: 'Unknown',
            };
            // console.log(this.driver.id);
            this.homey.flow.getDeviceTriggerCard('changedBatteryStatus').trigger(this, { status: status_str[result['batt1-status'].value] }, {});
          }
          this.setCapabilityValue('battstatus', result['batt1-status'].value);
        }
      }
      if (this.validResultRecord(result['batt1-maximum_energy'])) {
        var maxenergy = Number(result['batt1-maximum_energy'].value);
        if (this.hasCapability('batterymaxcap') === false) {
          await this.addCapability('batterymaxcap');
        }  
        this.setCapabilityValue('batterymaxcap', maxenergy / 1000);
      }

      if (this.validResultRecord(result['batt1-available_energy'])) {
        var availenergy = Number(result['batt1-available_energy'].value);
        if (this.hasCapability('batterycap') === false) {
          await this.addCapability('batterycap');
        }  
        this.setCapabilityValue('batterycap', availenergy / 1000);
      }

      if (this.validResultRecord(result['batt2-average_temperature'])) {
        if (this.hasCapability('measure_temperature.battery2') === false) {
          await this.addCapability('measure_temperature.battery2');
        }  
        var batt_temperature = Number(result['batt2-average_temperature'].value);
        this.setCapabilityValue('measure_temperature.battery2', Math.round(batt_temperature));
      }

      if (this.validResultRecord(result['batt2-status'])) {
        if (parseInt(result['batt2-status'].value) < 11) {
          if (this.hasCapability('battstatus2') === false) {
            await this.addCapability('battstatus2');
          }  
          this.setCapabilityValue('battstatus2', result['batt2-status'].value);
        }
      }
      if (this.validResultRecord(result['batt2-maximum_energy'])) {
        var maxenergy = Number(result['batt2-maximum_energy'].value);
        if (this.hasCapability('batterymaxcap2') === false) {
          await this.addCapability('batterymaxcap2');
        }  
        this.setCapabilityValue('batterymaxcap2', maxenergy / 1000);
      }
      if (this.validResultRecord(result['batt2-available_energy'])) {
        var availenergy = Number(result['batt2-available_energy'].value);
        if (this.hasCapability('batterycap2') === false) {
          await this.addCapability('batterycap2');
        }  
        this.setCapabilityValue('batterycap2', availenergy / 1000);
      }
    }
  }
}
