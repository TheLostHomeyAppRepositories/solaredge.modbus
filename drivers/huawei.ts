import Homey, { Device } from 'homey';

export interface Measurement {
  value: string;
  scale: string;
  label: string;
}

export class Huawei extends Homey.Device {
  holdingRegisters: Object = {
    // rn.RATED_POWER: U32Register("W", 1, 30073, 2),
    // "ratedPower": [30073, 2, 'UINT32', "Rated Power", 0],

    // // total solar
    inputPower: [32064, 2, 'INT32', 'Input Power', 0], //	kW	1000

    // rn.GRID_VOLTAGE: U16Register("V", 10, 32066, 1),
    GRID_VOLTAGE: [32066, 1, 'UINT16', 'GRID VOLTAGE', -1],
    // rn.PHASE_A_VOLTAGE: U16Register("V", 10, 32069, 1),
    PHASE_A_VOLTAGE: [32069, 1, 'UINT16', 'GRID PHASE_A_VOLTAGE', -1],
    // rn.PHASE_B_VOLTAGE: U16Register("V", 10, 32070, 1),
    PHASE_B_VOLTAGE: [32070, 1, 'UINT16', 'GRID PHASE_B_VOLTAGE', -1],
    // rn.PHASE_C_VOLTAGE: U16Register("V", 10, 32071, 1),
    PHASE_C_VOLTAGE: [32071, 1, 'UINT16', 'GRID PHASE_C_VOLTAGE', -1],

    // rn.PHASE_A_CURRENT: I32Register("A", 1000, 32072, 2),
    PHASE_A_CURRENT: [32072, 2, 'INT32', 'GRID PHASE_A_CURRENT', -3],
    // rn.PHASE_B_CURRENT: I32Register("A", 1000, 32074, 2),
    PHASE_B_CURRENT: [32074, 2, 'INT32', 'GRID PHASE_B_CURRENT', -3],
    // rn.PHASE_C_CURRENT: I32Register("A", 1000, 32076, 2),
    PHASE_C_CURRENT: [32076, 2, 'INT32', 'GRID PHASE_C_CURRENT', -3],

    // rn.ACCUMULATED_YIELD_ENERGY: U32Register("kWh", 100, 32106, 2),
    ACCUMULATED_YIELD_ENERGY: [32106, 2, 'UINT32', 'ACCUMULATED YIELD ENERGY', -2],
    // rn.DAY_ACTIVE_POWER_PEAK: I32Register("W", 1, 32078, 2),
    // "DAY_ACTIVE_POWER_PEAK": [32078, 2, 'INT32', "DAY_ACTIVE_POWER_PEAK", 0],

    // rn.ACTIVE_POWER: I32Register("W", 1, 32080, 2),
    ACTIVE_POWER: [32080, 2, 'INT32', 'ACTIVE_POWER', 0],
    // rn.GRID_FREQUENCY: U16Register("Hz", 100, 32085, 1),
    // "GRID_FREQUENCY": [32085, 1, 'UINT16', "GRID_FREQUENCY", -2],
    // rn.INTERNAL_TEMPERATURE: I16Register("°C", 10, 32087, 1),
    INTERNAL_TEMPERATURE: [32087, 1, 'INT16', 'INTERNAL_TEMPERATURE', -1],

    // rn.DEVICE_STATUS: U16Register(rv.DEVICE_STATUS_DEFINITIONS, 1, 32089, 1),
    DEVICE_STATUS: [32089, 1, 'UINT16', 'DEVICE_STATUS', 0],
    // rn.DAILY_YIELD_ENERGY: U32Register("kWh", 100, 32114, 2),
    DAILY_YIELD_ENERGY: [32114, 2, 'UINT32', 'DAILY_YIELD_ENERGY', -2],

    // Electricity generated in current month
    // U 32
    // kWh
    // 100
    // 32116
    // 2

    // Electricity generated in the current year
    // U 32
    // kWh
    // 100
    // 32118
    // 2

    // rn.MODEL_NAME: StringRegister(30000, 15),
    modelName: [30000, 15, 'STRING', 'Model Name', 0],
    // rn.MODEL_ID: U16Register(None, 1, 30070, 1),
    // "modelId": [30070, 1, 'UINT16', "Model ID", 0],

    // "Number of PV strings"	RO	U16	N/A	1	30071	1
    // "TotalPVstrings": [30071, 1, 'UINT16', "Number of PV strings", 0],
    // PV1 voltage	RO	I16	V	10	32016
    PV1voltage: [32016, 1, 'INT16', 'PV1 voltage', -1],
    // PV1 current	RO	I16	A	100	32017
    PV1current: [32017, 1, 'INT16', 'PV1 current', -2],
    // PV2 voltage	RO	I16	V	10	32018
    PV2voltage: [32018, 1, 'INT16', 'PV2 voltage', -1],
    // PV2 current	RO	I16	A	100	32019
    PV2current: [32019, 1, 'INT16', 'PV2 current', -2],
  };

  holdingRegistersMeters: Object = {
    // rn.GRID_A_VOLTAGE: I32Register("V", 10, 37101, 2),
    GRID_A_VOLTAGE: [37101, 2, 'INT32', 'GRID PHASE_A_VOLTAGE', -1],
    // rn.GRID_B_VOLTAGE: I32Register("V", 10, 37103, 2),
    GRID_B_VOLTAGE: [37105, 2, 'INT32', 'GRID PHASE_B_VOLTAGE', -1],
    // rn.GRID_C_VOLTAGE: I32Register("V", 10, 37105, 2),
    GRID_C_VOLTAGE: [37105, 2, 'INT32', 'GRID PHASE_C_VOLTAGE', -1],

    // rn.ACTIVE_GRID_A_CURRENT: I32Register("I", 100, 37107, 2),
    GRID_PHASE_A_CURRENT: [37107, 2, 'INT32', 'GRID PHASE_A_CURRENT', -2],
    // rn.ACTIVE_GRID_B_CURRENT: I32Register("I", 100, 37109, 2),
    GRID_PHASE_B_CURRENT: [37109, 2, 'INT32', 'GRID PHASE_B_CURRENT', -2],
    // rn.ACTIVE_GRID_C_CURRENT: I32Register("I", 100, 37111, 2),
    GRID_PHASE_C_CURRENT: [37111, 2, 'INT32', 'GRID PHASE_C_CURRENT', -2],

    // rn.POWER_METER_ACTIVE_POWER: I32Register("W", 1, 37113, 2),
    POWER_METER_ACTIVE_POWER: [37113, 2, 'INT32', 'POWER METER_ACTIVE_POWER', 0],

    // rn.GRID_EXPORTED_ENERGY: I32AbsoluteValueRegister("kWh", 100, 37119, 2),
    GRID_EXPORTED_ENERGY: [37119, 2, 'INT32', 'GRID_EXPORTED_ENERGY', -2],
    // rn.GRID_ACCUMULATED_ENERGY: I32Register("kWh", 100, 37121, 2),
    GRID_ACCUMULATED_ENERGY: [37121, 2, 'INT32', 'GRID_ACCUMULATED_ENERGY', -2],

    // rn.ACTIVE_GRID_A_POWER: I32Register("W", 1, 37132, 2),
    ACTIVE_GRID_A_POWER: [37132, 2, 'INT32', 'ACTIVE_GRID_A_POWER', 0],
    // rn.ACTIVE_GRID_B_POWER: I32Register("W", 1, 37134, 2),
    ACTIVE_GRID_B_POWER: [37134, 2, 'INT32', 'ACTIVE_GRID_B_POWER', 0],
    // rn.ACTIVE_GRID_C_POWER: I32Register("W", 1, 37136, 2),
    ACTIVE_GRID_C_POWER: [37136, 2, 'INT32', 'ACTIVE_GRID_C_POWER', 0],
  };

  holdingRegistersBattery: Object = {
    // "STORAGE_RUNNING_STATUS": [37762, 1, 'UINT16', "RUNNING STATUS", 0],
    STORAGE_CHARGE_DISCHARGE_POWER: [37765, 2, 'INT32', 'CHARGE_DISCHARGE POWER', 0],
    STORAGE_STATE_OF_CAPACITY: [37760, 1, 'UINT16', 'STORAGE_STATE_OF_CAPACITY', -1],

    STORAGE_CURRENT_DAY_CHARGE_CAPACITY: [37784, 2, 'UINT32', 'CURRENT_DAY_CHARGE_CAPACITY', -2],
    STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY: [37786, 2, 'UINT32', 'CURRENT_DAY_DISCHARGE_CAPACITY', -2],

    STORAGE_TOTAL_CHARGE: [37780, 2, 'UINT32', 'TOTAL_CHARGE', -2],
    STORAGE_TOTAL_DISCHARGE: [37782, 2, 'UINT32', 'TOTAL_DISCHARGE', -2],

    STORAGE_MAXIMUM_CHARGE_POWER: [37046, 2, 'UINT32', 'STORAGE_MAXIMUM_CHARGE_POWER', 0],
    STORAGE_MAXIMUM_DISCHARGE_POWER: [37048, 2, 'UINT32', 'STORAGE_MAXIMUM_DISCHARGE_POWER', 0],
    STORAGE_RATED_CAPACITY: [37758, 2, 'UINT32', 'STORAGE_RATED_CAPACITY', 0],

    ACTIVE_POWER_CONTROL_MODE: [47415, 1, 'UINT16', 'ACTIVE_POWER_CONTROL_MODE', 0],
    //         rn.ACTIVE_POWER_CONTROL_MODE: U16Register(rv.ActivePowerControlMode, 1, 47415, 1, writeable=True),

    //         """Active Power Control Mode."""

    //         UNLIMITED = 0  # default mode
    //         DI_ACTIVE_SCHEDULING = 1
    //         ZERO_POWER_GRID_CONNECTION = 5
    //         POWER_LIMITED_GRID_CONNECTION_WATT = 6
    //         POWER_LIMITED_GRID_CONNECTION_PERCENT = 7

    REMOTE_CHARGE_DISCHARGE_CONTROL_MODE: [47589, 1, 'INT16', 'REMOTE_CHARGE_DISCHARGE_CONTROL_MODE', 0],
    // rn.REMOTE_CHARGE_DISCHARGE_CONTROL_MODE: I16Register(
    // rv.RemoteChargeDischargeControlMode, 1, 47589, 1, writeable=True
    // ),

    //         """Remote Charge/Discharge Control Mode"""

    //         LOCAL_CONTROL = 0
    //         REMOTE_CONTROL_MAXIMUM_SELF_CONSUMPTION = 1
    //         REMOTE_CONTROL_FULLY_FED_TO_GRID = 2
    //         REMOTE_CONTROL_TOU = 3
    //         REMOTE_CONTROL_AI_CONTROL = 4

    STORAGE_FORCIBLE_CHARGE_DISCHARGE_SOC: [47101, 1, 'UINT16', 'STORAGE_FORCIBLE_CHARGE_DISCHARGE_SOC', -1],
    // rn.STORAGE_FORCIBLE_CHARGE_DISCHARGE_SOC: U16Register("%", 10, 47101, 1, writeable=True),

    STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE: [47100, 1, 'UINT16', 'STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE', 0],
    // rn.STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE: U16Register(
    // rv.StorageForcibleChargeDischarge, 1, 47100, 1, writeable=True
    // ),

    //         """Storage Product Model."""

    //         STOP = 0
    //         CHARGE = 1
    //         DISCHARGE = 2

    STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU: [47299, 1, 'UINT16', 'STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU', 0],
    // rn.STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU: U16Register(rv.StorageExcessPvEnergyUseInTOU, 1, 47299, 1, writeable=True),
    //         """Storage Excess PV Energy use in Time-of-Use."""

    //         FED_TO_GRID = 0
    //         CHARGE = 1

    STORAGE_WORKING_MODE_SETTINGS: [47086, 1, 'UINT16', 'STORAGE_WORKING_MODE_SETTINGS', 0],
    // rn.STORAGE_WORKING_MODE_SETTINGS: U16Register(rv.StorageWorkingModesC, 1, 47086, 1, writeable=True),
    //         """Working mode of the Connected Energy Storage."""

    //         ADAPTIVE = 0
    //         FIXED_CHARGE_DISCHARGE = 1
    //         MAXIMISE_SELF_CONSUMPTION = 2
    //         TIME_OF_USE_LG = 3
    //         FULLY_FED_TO_GRID = 4
    //         TIME_OF_USE_LUNA2000 = 5
  };

  holdingEmmaRegisters: Object = {
    // "offering_name": [30000, 16, 'STRING', "Offering Name", 0],
    // "sn": [30015, 10, 'STRING', "sn", 0],
    software_version: [30035, 15, 'STRING', 'software version', 0],

    // Model  RO STR N/A N/A 30222 20
    model: [30222, 20, 'STRING', 'Model Name', 0],
    // Energy charged today RO U32 kWh 100 30306  2
    energy_charged_today: [30306, 2, 'UINT32', 'Energy charged today', -2],
    energy_charged_total: [30308, 4, 'UINT64', 'Energy charged total', -2],
    energy_discharged_today: [30312, 2, 'UINT32', 'Energy discharged today', -2],
    energy_discharged_total: [30314, 4, 'UINT64', 'Energy discharged total', -2],


    consumption_today: [30324, 2, 'UINT32', 'Consumption today', -2],
    feedin_to_grid_today: [30330, 2, 'UINT32', 'Feed-in to grid today', -2],

    supply_from_grid_today: [30336, 2, 'UINT32', 'Supply from grid today', -2],
    inverter_energy_yield_today: [30342, 2, 'UINT32', 'Inverter energy yield today', -2],
    pv_yield_today: [30346, 2, 'UINT32', 'PV yield today', -2],

    total_pv_energy_yield: [30348, 4, 'UINT64', 'Total PV energy yield', -2],

    pv_output_power: [30354, 2, 'UINT32', 'PV output power', 0],
    load_power: [30356, 2, 'UINT32', 'Load power', 0],
    feedin_power: [30358, 2, 'INT32', 'Feed-in power', 0],
    battery_charge_discharge_power: [30360, 2, 'INT32', 'Battery charge/ discharge power', 0],
    inverter_rated_power: [30362, 2, 'UINT32', 'Inverter rated power', 0],
    inverter_active_power: [30364, 2, 'INT32', 'Inverter active power', 0],

    // SOC RO U16 % 100  30368  1
    soc: [30368, 1, 'UINT16', 'soc', -2],

    // Yield this month  RO U32 kWh 100 30380 2
    yield_this_month: [30380, 2, 'UINT32', 'Yield this month', -2],

    // Local time RO U32 31003 2
    time: [31003, 2, 'UINT32', 'local time', 0],

    // Battery control ESS control mode RW ENUM16 40000 1
    // 1: reserved
    // 2: maximum self-consumption
    // 3: reserved
    // 4: fully fed to grid
    // 5: time of use
    // 6: Third- party dispatch
    battery_control: [40000, 1, 'INT16', 'Battery control ESS control mode', 0],
    preferred_use_of_surplus_PV: [40001, 1, 'INT16', '[Time of Use mode] Preferred use of surplus PV power', 0],
    maximum_power_for_charging_from_grid: [40002, 2, 'UINT32', '[Time of Use mode] Maximum power for charging batteries from grid', -3],
    // 0: unlimited
    // 5: grid connecte d with zero power
    // 6: limited feed-in (kW)
    // 7: power- limited grid connecte d (%)
    power_control_mode_at_grid: [40100, 1, 'INT16', 'Power control mode at grid connection', 0],
    limitation_mode: [40101, 1, 'INT16', 'Limitation mode', 0],
    maximum_grid_feedin_power: [40107, 2, 'INT32', 'Maximum grid feed-in power (kW)', -3],
    maximum_grid_feedin_power_procent: [40109, 1, 'UINT16', 'Maximum grid feed-in power (%)', -1],

    phase_a_voltage: [31639, 2, 'UINT32', 'Phase A voltage', -2],
    phase_b_voltage: [31641, 2, 'UINT32', 'Phase B voltage', -2],
    phase_c_voltage: [31643, 2, 'UINT32', 'Phase C voltage', -2],
    phase_a_current: [31651, 2, 'INT32', 'Phase A current', -1],
    phase_b_current: [31653, 2, 'INT32', 'Phase B current', -1],
    phase_c_current: [31655, 2, 'INT32', 'Phase C current', -1],
    phase_a_power: [31663, 2, 'INT32', 'Phase A power', -3],
    phase_b_power: [31665, 2, 'INT32', 'Phase B power', -3],
    phase_c_power: [31667, 2, 'INT32', 'Phase C power', -3],
  };

  processEmmaResult(result: Record<string, Measurement>) {
    if (result) {
      // result
      for (const k in result) {
        console.log(k, result[k].value, result[k].scale, result[k].label);
      }

      if (
        result['phase_a_current']
        && result['phase_a_current'].value != '-1'
        && result['phase_a_current'].value != 'xxx'
        && this.hasCapability('measure_current.phase1')
      ) {
        this.addCapability('measure_current.phase1');
        const currenteac1 = Number(result['phase_a_current'].value) * Math.pow(10, Number(result['phase_a_current'].scale));
        this.setCapabilityValue('measure_current.phase1', currenteac1);
      }
      if (
        result['phase_b_current']
        && result['phase_b_current'].value != '-1'
        && result['phase_b_current'].value != 'xxx'
        && this.hasCapability('measure_current.phase2')
      ) {
        this.addCapability('measure_current.phase2');
        const currenteac2 = Number(result['phase_b_current'].value) * Math.pow(10, Number(result['phase_b_current'].scale));
        this.setCapabilityValue('measure_current.phase2', currenteac2);
      }
      if (
        result['phase_c_current']
        && result['phase_c_current'].value != '-1'
        && result['phase_c_current'].value != 'xxx'
        && this.hasCapability('measure_current.phase3')
      ) {
        this.addCapability('measure_current.phase3');
        const currenteac3 = Number(result['phase_c_current'].value) * Math.pow(10, Number(result['phase_c_current'].scale));
        this.setCapabilityValue('measure_current.phase3', currenteac3);
      }

      if (
        result['phase_a_voltage']
        && result['phase_a_voltage'].value != '-1'
        && result['phase_a_voltage'].value != 'xxx'
        && this.hasCapability('measure_voltage.phase1')
      ) {
        this.addCapability('measure_voltage.phase1');
        const voltageac1 = Number(result['phase_a_voltage'].value) * Math.pow(10, Number(result['phase_a_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase1', voltageac1);
      }
      if (
        result['phase_b_voltage']
        && result['phase_b_voltage'].value != '-1'
        && result['phase_b_voltage'].value != 'xxx'
        && this.hasCapability('measure_voltage.phase2')
      ) {
        this.addCapability('measure_voltage.phase2');
        const voltageac2 = Number(result['phase_b_voltage'].value) * Math.pow(10, Number(result['phase_b_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase2', voltageac2);
      }
      if (
        result['phase_c_voltage']
        && result['phase_c_voltage'].value != '-1'
        && result['phase_c_voltage'].value != 'xxx'
        && this.hasCapability('measure_voltage.phase3')
      ) {
        this.addCapability('measure_voltage.phase3');
        const voltageac3 = Number(result['phase_c_voltage'].value) * Math.pow(10, Number(result['phase_c_voltage'].scale));
        this.setCapabilityValue('measure_voltage.phase3', voltageac3);
      }

      if (result['inverter_active_power'] && result['inverter_active_power'].value != 'xxx') {
        this.addCapability('measure_power');
        const inverter_active_power = Number(result['inverter_active_power'].value) * Math.pow(10, Number(result['inverter_active_power'].scale));
        this.setCapabilityValue('measure_power', inverter_active_power);
      }

      if (result['pv_output_power'] && result['pv_output_power'].value != 'xxx') {
        this.addCapability('measure_power.input');
        const pv_output_power = Number(result['pv_output_power'].value) * Math.pow(10, Number(result['pv_output_power'].scale));
        this.setCapabilityValue('measure_power.input', pv_output_power);
      }

      if (result['load_power'] && result['load_power'].value != 'xxx') {
        this.addCapability('measure_power.houseload');
        const load_power = Number(result['load_power'].value) * Math.pow(10, Number(result['load_power'].scale));
        this.setCapabilityValue('measure_power.houseload', load_power);
      }

      if (result['feedin_power'] && result['feedin_power'].value != 'xxx') {
        this.addCapability('measure_power.feedin');
        const feedin_power = Number(result['feedin_power'].value) * Math.pow(10, Number(result['feedin_power'].scale));
        this.setCapabilityValue('measure_power.feedin', feedin_power);
      }

      if (result['battery_charge_discharge_power'] && result['battery_charge_discharge_power'].value != 'xxx') {
        this.addCapability('measure_power.batt_charge');
        const battery_charge_discharge_power = Number(result['battery_charge_discharge_power'].value) * Math.pow(10, Number(result['battery_charge_discharge_power'].scale));
        this.setCapabilityValue('measure_power.batt_charge', battery_charge_discharge_power);
      }

      if (result['soc'] && result['soc'].value != 'xxx' && this.hasCapability('measure_battery')) {
        this.addCapability('measure_battery');
        this.addCapability('battery');
        const soc = Number(result['soc'].value) * Math.pow(10, Number(result['soc'].scale));
        this.setCapabilityValue('measure_battery', soc);
        this.setCapabilityValue('battery', soc);
      }

      if (result['pv_yield_today'] && result['pv_yield_today'].value != 'xxx') {
        this.addCapability('meter_power.daily');
        const pv_yield_today = Number(result['pv_yield_today'].value) * Math.pow(10, Number(result['pv_yield_today'].scale));
        this.setCapabilityValue('meter_power.daily', pv_yield_today);
      }

      if (result['total_pv_energy_yield'] && result['total_pv_energy_yield'].value != 'xxx') {
        this.addCapability('meter_power');
        const total_pv_energy_yield = Number(result['total_pv_energy_yield'].value) * Math.pow(10, Number(result['total_pv_energy_yield'].scale));
        this.setCapabilityValue('meter_power', total_pv_energy_yield);
      }

      if (result['supply_from_grid_today'] && result['supply_from_grid_today'].value != 'xxx') {
        this.addCapability('meter_power.grid_import');
        const supply_from_grid_today = Number(result['supply_from_grid_today'].value) * Math.pow(10, Number(result['supply_from_grid_today'].scale));
        this.setCapabilityValue('meter_power.grid_import', supply_from_grid_today);
      }

      if (result['feedin_to_grid_today'] && result['feedin_to_grid_today'].value != 'xxx') {
        this.addCapability('meter_power.grid_export');
        const feedin_to_grid_today = Number(result['feedin_to_grid_today'].value) * Math.pow(10, Number(result['feedin_to_grid_today'].scale));
        this.setCapabilityValue('meter_power.grid_export', feedin_to_grid_today);
      }

      if (result['battery_control'] && result['battery_control'].value != 'xxx') {
        this.addCapability('battery_control');
        const battery_control = result['battery_control'].value;
        this.setCapabilityValue('battery_control', battery_control);
      }

      if (result['power_control_mode_at_grid'] && result['power_control_mode_at_grid'].value != 'xxx') {
        this.addCapability('power_control_mode_at_grid');
        const power_control_mode_at_grid = result['power_control_mode_at_grid'].value;
        this.setCapabilityValue('power_control_mode_at_grid', power_control_mode_at_grid);
      }

      if (result['energy_charged_today'] && result['energy_charged_today'].value != 'xxx') {
        this.addCapability('meter_power.daily_charge');
        const energy_charged_today = Number(result['energy_charged_today'].value) * Math.pow(10, Number(result['energy_charged_today'].scale));
        this.setCapabilityValue('meter_power.daily_charge', energy_charged_today);
      }

      if (result['energy_discharged_today'] && result['energy_discharged_today'].value != 'xxx') {
        this.addCapability('meter_power.daily_discharge');
        const energy_discharged_today = Number(result['energy_discharged_today'].value) * Math.pow(10, Number(result['energy_discharged_today'].scale));
        this.setCapabilityValue('meter_power.daily_discharge', energy_discharged_today);
      }

      if (result['energy_charged_total'] && result['energy_charged_total'].value != 'xxx') {
        this.addCapability('meter_power.total_charge');
        const energy_charged_total = Number(result['energy_charged_total'].value) * Math.pow(10, Number(result['energy_charged_total'].scale));
        this.setCapabilityValue('meter_power.total_charge', energy_charged_total);
      }

      if (result['energy_discharged_total'] && result['energy_discharged_total'].value != 'xxx') {
        this.addCapability('meter_power.total_discharge');
        const energy_discharged_total = Number(result['energy_discharged_total'].value) * Math.pow(10, Number(result['energy_discharged_total'].scale));
        this.setCapabilityValue('meter_power.total_discharge', energy_discharged_total);
      }

    }
  }

  processResult(result: Record<string, Measurement>, power: boolean = false) {
    if (result) {
      // result
      for (const k in result) {
        console.log('huawei: ', k, result[k].value, result[k].scale, result[k].label);
      }

      if (
        result['PHASE_A_CURRENT']
        && result['PHASE_A_CURRENT'].value != '-1'
        && result['PHASE_A_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase1')
      ) {
        this.addCapability('measure_current.phase1');
        var currenteac1 = Number(result['PHASE_A_CURRENT'].value) * Math.pow(10, Number(result['PHASE_A_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase1', currenteac1);
      }
      if (
        result['PHASE_B_CURRENT']
        && result['PHASE_B_CURRENT'].value != '-1'
        && result['PHASE_B_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase2')
      ) {
        this.addCapability('measure_current.phase2');
        var currenteac2 = Number(result['PHASE_B_CURRENT'].value) * Math.pow(10, Number(result['PHASE_B_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase2', currenteac2);
      }
      if (
        result['PHASE_C_CURRENT']
        && result['PHASE_C_CURRENT'].value != '-1'
        && result['PHASE_C_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase3')
      ) {
        this.addCapability('measure_current.phase3');
        var currenteac3 = Number(result['PHASE_C_CURRENT'].value) * Math.pow(10, Number(result['PHASE_C_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase3', currenteac3);
      }

      if (
        result['GRID_PHASE_A_CURRENT']
        && result['GRID_PHASE_A_CURRENT'].value != '-1'
        && result['GRID_PHASE_A_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase1')
      ) {
        this.addCapability('measure_current.grid_phase1');
        var currenteac1 = Number(result['GRID_PHASE_A_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_A_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase1', currenteac1);
      }
      if (
        result['GRID_PHASE_B_CURRENT']
        && result['GRID_PHASE_B_CURRENT'].value != '-1'
        && result['GRID_PHASE_B_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase2')
      ) {
        this.addCapability('measure_current.grid_phase2');
        var currenteac2 = Number(result['GRID_PHASE_B_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_B_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase2', currenteac2);
      }
      if (
        result['GRID_PHASE_C_CURRENT']
        && result['GRID_PHASE_C_CURRENT'].value != '-1'
        && result['GRID_PHASE_C_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase3')
      ) {
        this.addCapability('measure_current.grid_phase3');
        var currenteac3 = Number(result['GRID_PHASE_C_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_C_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase3', currenteac3);
      }

      if (result['PV1current'] && result['PV1current'].value != '-1' && result['PV1current'].value != 'xxx' && this.hasCapability('measure_current.pv1')) {
        this.addCapability('measure_current.pv1');
        const currentepv1 = Number(result['PV1current'].value) * Math.pow(10, Number(result['PV1current'].scale));
        this.setCapabilityValue('measure_current.pv1', currentepv1);
      }
      if (result['PV2current'] && result['PV2current'].value != '-1' && result['PV2current'].value != 'xxx' && this.hasCapability('measure_current.pv2')) {
        this.addCapability('measure_current.pv2');
        const currentpv2 = Number(result['PV2current'].value) * Math.pow(10, Number(result['PV2current'].scale));
        this.setCapabilityValue('measure_current.pv2', currentpv2);
      }

      if (result['INTERNAL_TEMPERATURE'] && result['INTERNAL_TEMPERATURE'].value != 'xxx') {
        this.addCapability('measure_temperature.invertor');
        const temperature = Number(result['INTERNAL_TEMPERATURE'].value) * Math.pow(10, Number(result['INTERNAL_TEMPERATURE'].scale));
        this.setCapabilityValue('measure_temperature.invertor', temperature);
      }

      if (result['DAILY_YIELD_ENERGY'] && result['DAILY_YIELD_ENERGY'].value != 'xxx') {
        this.addCapability('meter_power.daily');
        const DAILY_YIELD_ENERGY = Number(result['DAILY_YIELD_ENERGY'].value) * Math.pow(10, Number(result['DAILY_YIELD_ENERGY'].scale));
        this.setCapabilityValue('meter_power.daily', DAILY_YIELD_ENERGY);
      }

      if (result['ACCUMULATED_YIELD_ENERGY'] && result['ACCUMULATED_YIELD_ENERGY'].value != 'xxx') {
        this.addCapability('meter_power');
        const ACCUMULATED_YIELD_ENERGY = Number(result['ACCUMULATED_YIELD_ENERGY'].value) * Math.pow(10, Number(result['ACCUMULATED_YIELD_ENERGY'].scale));
        this.setCapabilityValue('meter_power', ACCUMULATED_YIELD_ENERGY);
      }

      if (result['GRID_VOLTAGE'] && result['GRID_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage')) {
        this.addCapability('measure_voltage');
        const GRID_VOLTAGE = Number(result['GRID_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage', GRID_VOLTAGE);
      }

      if (result['GRID_A_VOLTAGE'] && result['GRID_A_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase1')) {
        this.addCapability('measure_voltage.grid_phase1');
        const GRID_A_VOLTAGE = Number(result['GRID_A_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_A_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase1', GRID_A_VOLTAGE);
      }

      if (result['GRID_B_VOLTAGE'] && result['GRID_B_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase2')) {
        this.addCapability('measure_voltage.grid_phase2');
        const GRID_B_VOLTAGE = Number(result['GRID_B_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_B_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase2', GRID_B_VOLTAGE);
      }

      if (result['GRID_C_VOLTAGE'] && result['GRID_C_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase3')) {
        this.addCapability('measure_voltage.grid_phase3');
        const GRID_C_VOLTAGE = Number(result['GRID_C_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_C_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase3', GRID_C_VOLTAGE);
      }

      if (result['PHASE_A_VOLTAGE'] && result['PHASE_A_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase1')) {
        this.addCapability('measure_voltage.phase1');
        const PHASE_A_VOLTAGE = Number(result['PHASE_A_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_A_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase1', PHASE_A_VOLTAGE);
      }

      if (result['PHASE_B_VOLTAGE'] && result['PHASE_B_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase2')) {
        this.addCapability('measure_voltage.phase2');
        const PHASE_B_VOLTAGE = Number(result['PHASE_B_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_B_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase2', PHASE_B_VOLTAGE);
      }

      if (result['PHASE_C_VOLTAGE'] && result['PHASE_C_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase3')) {
        this.addCapability('measure_voltage.phase3');
        const PHASE_C_VOLTAGE = Number(result['PHASE_C_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_C_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase3', PHASE_C_VOLTAGE);
      }

      if (result['PV1voltage'] && result['PV1voltage'].value != 'xxx' && this.hasCapability('measure_voltage.pv1')) {
        this.addCapability('measure_voltage.pv1');
        const PV1voltage = Number(result['PV1voltage'].value) * Math.pow(10, Number(result['PV1voltage'].scale));
        this.setCapabilityValue('measure_voltage.pv1', PV1voltage);
      }

      if (result['PV2voltage'] && result['PV2voltage'].value != 'xxx' && this.hasCapability('measure_voltage.pv2')) {
        this.addCapability('measure_voltage.pv2');
        const PV2voltage = Number(result['PV2voltage'].value) * Math.pow(10, Number(result['PV2voltage'].scale));
        this.setCapabilityValue('measure_voltage.pv2', PV2voltage);
      }

      if (power == false) {
        if (result['inputPower'] && result['inputPower'].value != 'xxx') {
          this.addCapability('measure_power');
          var inputPower = Number(result['inputPower'].value) * Math.pow(10, Number(result['inputPower'].scale));
          this.setCapabilityValue('measure_power', inputPower);
        }
      } else if (result['inputPower'] && result['inputPower'].value != 'xxx' && this.hasCapability('measure_power_1')) {
        this.addCapability('measure_power_1');
        var inputPower = Number(result['inputPower'].value) * Math.pow(10, Number(result['inputPower'].scale));
        this.setCapabilityValue('measure_power_1', inputPower);
      }

      if (result['ACTIVE_POWER'] && result['ACTIVE_POWER'].value != 'xxx') {
        this.addCapability('measure_power.active_power');
        const ACTIVE_POWER = Number(result['ACTIVE_POWER'].value) * Math.pow(10, Number(result['ACTIVE_POWER'].scale));
        this.setCapabilityValue('measure_power.active_power', ACTIVE_POWER);
      }

      const DEVICE_STATUS_DEFINITIONS: { [key: string]: string } = {
        0: 'Standby: initializing',
        1: 'Standby: detecting insulation resistance',
        2: 'Standby: detecting irradiation',
        3: 'Standby: grid detecting',
        256: 'Starting',
        512: 'On-grid',
        513: 'Grid Connection: power limited',
        514: 'Grid Connection: self-derating',
        515: 'Off-grid mode: running',
        768: 'Shutdown: fault',
        769: 'Shutdown: command',
        770: 'Shutdown: OVGR',
        771: 'Shutdown: communication disconnected',
        772: 'Shutdown: power limited',
        773: 'Shutdown: manual startup required',
        774: 'Shutdown: DC switches disconnected',
        775: 'Shutdown: rapid cutoff',
        776: 'Shutdown: input underpowered',
        1025: 'Grid scheduling: cosphi-P curve',
        1026: 'Grid scheduling: Q-U curve',
        1027: 'Grid scheduling: PF-U curve',
        1028: 'Grid scheduling: dry contact',
        1029: 'Grid scheduling: Q-P curve',
        1280: 'Spot-check ready',
        1281: 'Spot-checking',
        1536: 'Inspecting',
        1792: 'AFCI self check',
        2048: 'I-V scanning',
        2304: 'DC input detection',
        2560: 'Running: off-grid charging',
        40960: 'Standby: no irradiation',
      };

      if (result['DEVICE_STATUS'] && result['DEVICE_STATUS'].value !== undefined && result['DEVICE_STATUS'].value && result['DEVICE_STATUS'].value != 'xxx') {
        this.addCapability('huawei_status');
        const huawei_status = result['DEVICE_STATUS'].value;
        this.setCapabilityValue('huawei_status', DEVICE_STATUS_DEFINITIONS[huawei_status]);
        console.log(`inverter status ${DEVICE_STATUS_DEFINITIONS[huawei_status]}`);
      }

      // "STORAGE_STATE_OF_CAPACITY": [37760, 1, 'UINT16', "RUNNING STATUS", -1],
      if (result['STORAGE_STATE_OF_CAPACITY'] && result['STORAGE_STATE_OF_CAPACITY'].value != 'xxx' && this.hasCapability('measure_battery')) {
        this.addCapability('battery');
        this.addCapability('measure_battery');
        const soc = Number(result['STORAGE_STATE_OF_CAPACITY'].value) * Math.pow(10, Number(result['STORAGE_STATE_OF_CAPACITY'].scale));
        this.setCapabilityValue('battery', soc);
        this.setCapabilityValue('measure_battery', soc);
      }

      // "STORAGE_CHARGE_DISCHARGE_POWER": [37765, 2, 'INT32', "CHARGE_DISCHARGE POWER", 0],
      if (
        result['STORAGE_CHARGE_DISCHARGE_POWER']
        && result['STORAGE_CHARGE_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.batt_discharge')
      ) {
        this.addCapability('measure_power.batt_discharge');
        const discharge = Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].scale));
        if (discharge < 0) {
          this.setCapabilityValue('measure_power.batt_discharge', -1 * discharge);
        } else {
          this.setCapabilityValue('measure_power.batt_discharge', 0);
        }
      }
      if (
        result['STORAGE_CHARGE_DISCHARGE_POWER']
        && result['STORAGE_CHARGE_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.batt_charge')
      ) {
        this.addCapability('measure_power.batt_charge');
        const charge = Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].scale));
        if (charge > 0) {
          this.setCapabilityValue('measure_power.batt_charge', charge);
        } else {
          this.setCapabilityValue('measure_power.batt_charge', 0);
        }
      }

      if (result['ACTIVE_GRID_A_POWER'] && result['ACTIVE_GRID_A_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase1')) {
        this.addCapability('measure_power.grid_phase1');
        const ACTIVE_GRID_A_POWER = Number(result['ACTIVE_GRID_A_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_A_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase1', ACTIVE_GRID_A_POWER);
      }

      if (result['ACTIVE_GRID_B_POWER'] && result['ACTIVE_GRID_B_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase2')) {
        this.addCapability('measure_power.grid_phase2');
        const ACTIVE_GRID_B_POWER = Number(result['ACTIVE_GRID_B_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_B_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase2', ACTIVE_GRID_B_POWER);
      }

      if (result['ACTIVE_GRID_C_POWER'] && result['ACTIVE_GRID_C_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase3')) {
        this.addCapability('measure_power.grid_phase3');
        const ACTIVE_GRID_C_POWER = Number(result['ACTIVE_GRID_C_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_C_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase3', ACTIVE_GRID_C_POWER);
      }

      if (result['POWER_METER_ACTIVE_POWER'] && result['POWER_METER_ACTIVE_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_active_power')) {
        this.addCapability('measure_power.grid_active_power');
        const POWER_METER_ACTIVE_POWER = Number(result['POWER_METER_ACTIVE_POWER'].value) * Math.pow(10, Number(result['POWER_METER_ACTIVE_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_active_power', POWER_METER_ACTIVE_POWER);
      }

      if (result['GRID_EXPORTED_ENERGY'] && result['GRID_EXPORTED_ENERGY'].value != 'xxx' && this.hasCapability('meter_power.grid_import')) {
        this.addCapability('meter_power.grid_import');
        const GRID_EXPORTED_ENERGY = Number(result['GRID_EXPORTED_ENERGY'].value) * Math.pow(10, Number(result['GRID_EXPORTED_ENERGY'].scale));
        this.setCapabilityValue('meter_power.grid_import', GRID_EXPORTED_ENERGY);
      }

      if (result['GRID_ACCUMULATED_ENERGY'] && result['GRID_ACCUMULATED_ENERGY'].value != 'xxx' && this.hasCapability('meter_power.grid_export')) {
        this.addCapability('meter_power.grid_export');
        const GRID_ACCUMULATED_ENERGY = Number(result['GRID_ACCUMULATED_ENERGY'].value) * Math.pow(10, Number(result['GRID_ACCUMULATED_ENERGY'].scale));
        this.setCapabilityValue('meter_power.grid_export', GRID_ACCUMULATED_ENERGY);
      }

      if (
        result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY']
        && result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].value != 'xxx'
        && this.hasCapability('meter_power.today_batt_output')
      ) {
        this.addCapability('meter_power.today_batt_output');
        const STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].value) * Math.pow(10, Number(result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].scale));
        this.setCapabilityValue('meter_power.today_batt_output', STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY);
      }

      if (
        result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY']
        && result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value != 'xxx'
        && this.hasCapability('meter_power.today_batt_input')
      ) {
        this.addCapability('meter_power.today_batt_input');
        var STORAGE_CURRENT_DAY_CHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value) * Math.pow(10, Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].scale));
        this.setCapabilityValue('meter_power.today_batt_input', STORAGE_CURRENT_DAY_CHARGE_CAPACITY);
      }

      if (
        result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY']
        && result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value != 'xxx'
        && this.hasCapability('meter_power.today_batt_input')
      ) {
        this.addCapability('meter_power.today_batt_input');
        var STORAGE_CURRENT_DAY_CHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value) * Math.pow(10, Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].scale));
        this.setCapabilityValue('meter_power.today_batt_input', STORAGE_CURRENT_DAY_CHARGE_CAPACITY);
      }

      if (result['ACTIVE_POWER_CONTROL_MODE'] && result['ACTIVE_POWER_CONTROL_MODE'].value != 'xxx' && this.hasCapability('activepower_controlmode')) {
        this.addCapability('activepower_controlmode');
        const ACTIVE_POWER_CONTROL_MODE = result['ACTIVE_POWER_CONTROL_MODE'].value;
        this.setCapabilityValue('activepower_controlmode', ACTIVE_POWER_CONTROL_MODE);
      }

      if (
        result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE']
        && result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE'].value != 'xxx'
        && this.hasCapability('storage_force_charge_discharge')
      ) {
        this.addCapability('storage_force_charge_discharge');
        const STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE = result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE'].value;
        this.setCapabilityValue('storage_force_charge_discharge', STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE);
      }

      if (
        result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU']
        && result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU'].value != 'xxx'
        && this.hasCapability('storage_excess_pv_energy_use_in_tou')
      ) {
        this.addCapability('storage_excess_pv_energy_use_in_tou');
        const STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU = result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU'].value;
        this.setCapabilityValue('storage_excess_pv_energy_use_in_tou', STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU);
      }

      if (
        result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE']
        && result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE'].value != 'xxx'
        && this.hasCapability('remote_charge_discharge_control_mode')
      ) {
        this.addCapability('remote_charge_discharge_control_mode');
        const REMOTE_CHARGE_DISCHARGE_CONTROL_MODE = result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE'].value;
        this.setCapabilityValue('remote_charge_discharge_control_mode', REMOTE_CHARGE_DISCHARGE_CONTROL_MODE);
      }

      if (
        result['STORAGE_WORKING_MODE_SETTINGS']
        && result['STORAGE_WORKING_MODE_SETTINGS'].value != 'xxx'
        && this.hasCapability('storage_working_mode_settings')
      ) {
        this.addCapability('storage_working_mode_settings');
        const STORAGE_WORKING_MODE_SETTINGS = result['STORAGE_WORKING_MODE_SETTINGS'].value;
        this.setCapabilityValue('storage_working_mode_settings', STORAGE_WORKING_MODE_SETTINGS);
      }

      if (
        result['STORAGE_MAXIMUM_CHARGE_POWER']
        && result['STORAGE_MAXIMUM_CHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.chargesetting')
      ) {
        this.addCapability('measure_power.chargesetting');
        const STORAGE_MAXIMUM_CHARGE_POWER = Number(result['STORAGE_MAXIMUM_CHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_MAXIMUM_CHARGE_POWER'].scale));
        this.setCapabilityValue('measure_power.chargesetting', STORAGE_MAXIMUM_CHARGE_POWER);
      }

      if (
        result['STORAGE_MAXIMUM_DISCHARGE_POWER']
        && result['STORAGE_MAXIMUM_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.dischargesetting')
      ) {
        this.addCapability('measure_power.dischargesetting');
        const STORAGE_MAXIMUM_DISCHARGE_POWER = Number(result['STORAGE_MAXIMUM_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_MAXIMUM_DISCHARGE_POWER'].scale));
        this.setCapabilityValue('measure_power.dischargesetting', STORAGE_MAXIMUM_DISCHARGE_POWER);
      }
    }
  }

  processResult2(result: Record<string, Measurement>) {
    if (result) {
      // result
      for (const k in result) {
        console.log('huawei: ', k, result[k].value, result[k].scale, result[k].label);
      }

      if (
        result['PHASE_A_CURRENT']
        && result['PHASE_A_CURRENT'].value != '-1'
        && result['PHASE_A_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase1_2')
      ) {
        this.addCapability('measure_current.phase1_2');
        var currenteac1 = Number(result['PHASE_A_CURRENT'].value) * Math.pow(10, Number(result['PHASE_A_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase1_2', currenteac1);
      }
      if (
        result['PHASE_B_CURRENT']
        && result['PHASE_B_CURRENT'].value != '-1'
        && result['PHASE_B_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase2_2')
      ) {
        this.addCapability('measure_current.phase2_2');
        var currenteac2 = Number(result['PHASE_B_CURRENT'].value) * Math.pow(10, Number(result['PHASE_B_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase2_2', currenteac2);
      }
      if (
        result['PHASE_C_CURRENT']
        && result['PHASE_C_CURRENT'].value != '-1'
        && result['PHASE_C_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.phase3_2')
      ) {
        this.addCapability('measure_current.phase3_2');
        var currenteac3 = Number(result['PHASE_C_CURRENT'].value) * Math.pow(10, Number(result['PHASE_C_CURRENT'].scale));
        this.setCapabilityValue('measure_current.phase3_2', currenteac3);
      }

      if (
        result['GRID_PHASE_A_CURRENT']
        && result['GRID_PHASE_A_CURRENT'].value != '-1'
        && result['GRID_PHASE_A_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase1_2')
      ) {
        this.addCapability('measure_current.grid_phase1_2');
        var currenteac1 = Number(result['GRID_PHASE_A_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_A_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase1_2', currenteac1);
      }
      if (
        result['GRID_PHASE_B_CURRENT']
        && result['GRID_PHASE_B_CURRENT'].value != '-1'
        && result['GRID_PHASE_B_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase2_2')
      ) {
        this.addCapability('measure_current.grid_phase2_2');
        var currenteac2 = Number(result['GRID_PHASE_B_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_B_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase2_2', currenteac2);
      }
      if (
        result['GRID_PHASE_C_CURRENT']
        && result['GRID_PHASE_C_CURRENT'].value != '-1'
        && result['GRID_PHASE_C_CURRENT'].value != 'xxx'
        && this.hasCapability('measure_current.grid_phase3_2')
      ) {
        this.addCapability('measure_current.grid_phase3_2');
        var currenteac3 = Number(result['GRID_PHASE_C_CURRENT'].value) * Math.pow(10, Number(result['GRID_PHASE_C_CURRENT'].scale));
        this.setCapabilityValue('measure_current.grid_phase3_2', currenteac3);
      }

      if (result['PV1current'] && result['PV1current'].value != '-1' && result['PV1current'].value != 'xxx' && this.hasCapability('measure_current.pv1_2')) {
        this.addCapability('measure_current.pv1_2');
        const currentepv1 = Number(result['PV1current'].value) * Math.pow(10, Number(result['PV1current'].scale));
        this.setCapabilityValue('measure_current.pv1_2', currentepv1);
      }
      if (result['PV2current'] && result['PV2current'].value != '-1' && result['PV2current'].value != 'xxx' && this.hasCapability('measure_current.pv2_2')) {
        this.addCapability('measure_current.pv2_2');
        const currentpv2 = Number(result['PV2current'].value) * Math.pow(10, Number(result['PV2current'].scale));
        this.setCapabilityValue('measure_current.pv2_2', currentpv2);
      }

      if (result['INTERNAL_TEMPERATURE'] && result['INTERNAL_TEMPERATURE'].value != 'xxx') {
        this.addCapability('measure_temperature.invertor_2');
        const temperature = Number(result['INTERNAL_TEMPERATURE'].value) * Math.pow(10, Number(result['INTERNAL_TEMPERATURE'].scale));
        this.setCapabilityValue('measure_temperature.invertor_2', temperature);
      }

      if (result['DAILY_YIELD_ENERGY'] && result['DAILY_YIELD_ENERGY'].value != 'xxx') {
        this.addCapability('meter_power.daily_2');
        const DAILY_YIELD_ENERGY = Number(result['DAILY_YIELD_ENERGY'].value) * Math.pow(10, Number(result['DAILY_YIELD_ENERGY'].scale));
        this.setCapabilityValue('meter_power.daily_2', DAILY_YIELD_ENERGY);
      }

      if (result['ACCUMULATED_YIELD_ENERGY'] && result['ACCUMULATED_YIELD_ENERGY'].value != 'xxx') {
        this.addCapability('meter_power_2');
        const ACCUMULATED_YIELD_ENERGY = Number(result['ACCUMULATED_YIELD_ENERGY'].value) * Math.pow(10, Number(result['ACCUMULATED_YIELD_ENERGY'].scale));
        this.setCapabilityValue('meter_power_2', ACCUMULATED_YIELD_ENERGY);
      }

      if (result['GRID_VOLTAGE'] && result['GRID_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage_2')) {
        this.addCapability('measure_voltage_2');
        const GRID_VOLTAGE = Number(result['GRID_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage_2', GRID_VOLTAGE);
      }

      if (result['GRID_A_VOLTAGE'] && result['GRID_A_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase1_2')) {
        this.addCapability('measure_voltage.grid_phase1_2');
        const GRID_A_VOLTAGE = Number(result['GRID_A_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_A_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase1_2', GRID_A_VOLTAGE);
      }

      if (result['GRID_B_VOLTAGE'] && result['GRID_B_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase2_2')) {
        this.addCapability('measure_voltage.grid_phase2_2');
        const GRID_B_VOLTAGE = Number(result['GRID_B_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_B_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase2_2', GRID_B_VOLTAGE);
      }

      if (result['GRID_C_VOLTAGE'] && result['GRID_C_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.grid_phase3_2')) {
        this.addCapability('measure_voltage.grid_phase3_2');
        const GRID_C_VOLTAGE = Number(result['GRID_C_VOLTAGE'].value) * Math.pow(10, Number(result['GRID_C_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.grid_phase3_2', GRID_C_VOLTAGE);
      }

      if (result['PHASE_A_VOLTAGE'] && result['PHASE_A_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase1_2')) {
        this.addCapability('measure_voltage.phase1_2');
        const PHASE_A_VOLTAGE = Number(result['PHASE_A_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_A_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase1_2', PHASE_A_VOLTAGE);
      }

      if (result['PHASE_B_VOLTAGE'] && result['PHASE_B_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase2_2')) {
        this.addCapability('measure_voltage.phase2_2');
        const PHASE_B_VOLTAGE = Number(result['PHASE_B_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_B_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase2_2', PHASE_B_VOLTAGE);
      }

      if (result['PHASE_C_VOLTAGE'] && result['PHASE_C_VOLTAGE'].value != 'xxx' && this.hasCapability('measure_voltage.phase3_2')) {
        this.addCapability('measure_voltage.phase3_2');
        const PHASE_C_VOLTAGE = Number(result['PHASE_C_VOLTAGE'].value) * Math.pow(10, Number(result['PHASE_C_VOLTAGE'].scale));
        this.setCapabilityValue('measure_voltage.phase3_2', PHASE_C_VOLTAGE);
      }

      if (result['PV1voltage'] && result['PV1voltage'].value != 'xxx' && this.hasCapability('measure_voltage.pv1_2')) {
        this.addCapability('measure_voltage.pv1_2');
        const PV1voltage = Number(result['PV1voltage'].value) * Math.pow(10, Number(result['PV1voltage'].scale));
        this.setCapabilityValue('measure_voltage.pv1_2', PV1voltage);
      }

      if (result['PV2voltage'] && result['PV2voltage'].value != 'xxx' && this.hasCapability('measure_voltage.pv2_2')) {
        this.addCapability('measure_voltage.pv2_2');
        const PV2voltage = Number(result['PV2voltage'].value) * Math.pow(10, Number(result['PV2voltage'].scale));
        this.setCapabilityValue('measure_voltage.pv2_2', PV2voltage);
      }

      if (result['inputPower'] && result['inputPower'].value != 'xxx') {
        this.addCapability('measure_power_2');
        const inputPower = Number(result['inputPower'].value) * Math.pow(10, Number(result['inputPower'].scale));
        this.setCapabilityValue('measure_power_2', inputPower);
      }

      if (result['ACTIVE_POWER'] && result['ACTIVE_POWER'].value != 'xxx') {
        this.addCapability('measure_power.active_power_2');
        const ACTIVE_POWER = Number(result['ACTIVE_POWER'].value) * Math.pow(10, Number(result['ACTIVE_POWER'].scale));
        this.setCapabilityValue('measure_power.active_power_2', ACTIVE_POWER);
      }

      const DEVICE_STATUS_DEFINITIONS: { [key: string]: string } = {
        0: 'Standby: initializing',
        1: 'Standby: detecting insulation resistance',
        2: 'Standby: detecting irradiation',
        3: 'Standby: grid detecting',
        256: 'Starting',
        512: 'On-grid',
        513: 'Grid Connection: power limited',
        514: 'Grid Connection: self-derating',
        515: 'Off-grid mode: running',
        768: 'Shutdown: fault',
        769: 'Shutdown: command',
        770: 'Shutdown: OVGR',
        771: 'Shutdown: communication disconnected',
        772: 'Shutdown: power limited',
        773: 'Shutdown: manual startup required',
        774: 'Shutdown: DC switches disconnected',
        775: 'Shutdown: rapid cutoff',
        776: 'Shutdown: input underpowered',
        1025: 'Grid scheduling: cosphi-P curve',
        1026: 'Grid scheduling: Q-U curve',
        1027: 'Grid scheduling: PF-U curve',
        1028: 'Grid scheduling: dry contact',
        1029: 'Grid scheduling: Q-P curve',
        1280: 'Spot-check ready',
        1281: 'Spot-checking',
        1536: 'Inspecting',
        1792: 'AFCI self check',
        2048: 'I-V scanning',
        2304: 'DC input detection',
        2560: 'Running: off-grid charging',
        40960: 'Standby: no irradiation',
      };

      if (result['DEVICE_STATUS'] && result['DEVICE_STATUS'].value !== undefined && result['DEVICE_STATUS'].value && result['DEVICE_STATUS'].value != 'xxx') {
        this.addCapability('huawei_status_2');
        const huawei_status = result['DEVICE_STATUS'].value;
        this.setCapabilityValue('huawei_status_2', DEVICE_STATUS_DEFINITIONS[huawei_status]);
        console.log(`inverter status ${DEVICE_STATUS_DEFINITIONS[huawei_status]}`);
      }

      // "STORAGE_STATE_OF_CAPACITY": [37760, 1, 'UINT16', "RUNNING STATUS", -1],
      if (result['STORAGE_STATE_OF_CAPACITY'] && result['STORAGE_STATE_OF_CAPACITY'].value != 'xxx' && this.hasCapability('battery2')) {
        this.addCapability('battery2');
        // this.addCapability('measure_battery2');
        const soc = Number(result['STORAGE_STATE_OF_CAPACITY'].value) * Math.pow(10, Number(result['STORAGE_STATE_OF_CAPACITY'].scale));
        this.setCapabilityValue('battery2', soc);
        // this.setCapabilityValue('measure_battery2', soc);
      }

      // "STORAGE_CHARGE_DISCHARGE_POWER": [37765, 2, 'INT32', "CHARGE_DISCHARGE POWER", 0],
      if (
        result['STORAGE_CHARGE_DISCHARGE_POWER']
        && result['STORAGE_CHARGE_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.batt_discharge2')
      ) {
        this.addCapability('measure_power.batt_discharge2');
        const discharge = Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].scale));
        if (discharge < 0) {
          this.setCapabilityValue('measure_power.batt_discharge2', -1 * discharge);
        } else {
          this.setCapabilityValue('measure_power.batt_discharge2', 0);
        }
      }
      if (
        result['STORAGE_CHARGE_DISCHARGE_POWER']
        && result['STORAGE_CHARGE_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.batt_charge2')
      ) {
        this.addCapability('measure_power.batt_charge2');
        const charge = Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_CHARGE_DISCHARGE_POWER'].scale));
        if (charge > 0) {
          this.setCapabilityValue('measure_power.batt_charge2', charge);
        } else {
          this.setCapabilityValue('measure_power.batt_charge2', 0);
        }
      }

      if (result['ACTIVE_GRID_A_POWER'] && result['ACTIVE_GRID_A_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase1_2')) {
        this.addCapability('measure_power.grid_phase1_2');
        const ACTIVE_GRID_A_POWER = Number(result['ACTIVE_GRID_A_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_A_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase1_2', ACTIVE_GRID_A_POWER);
      }

      if (result['ACTIVE_GRID_B_POWER'] && result['ACTIVE_GRID_B_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase2_2')) {
        this.addCapability('measure_power.grid_phase2_2');
        const ACTIVE_GRID_B_POWER = Number(result['ACTIVE_GRID_B_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_B_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase2_2', ACTIVE_GRID_B_POWER);
      }

      if (result['ACTIVE_GRID_C_POWER'] && result['ACTIVE_GRID_C_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_phase3_2')) {
        this.addCapability('measure_power.grid_phase3_2');
        const ACTIVE_GRID_C_POWER = Number(result['ACTIVE_GRID_C_POWER'].value) * Math.pow(10, Number(result['ACTIVE_GRID_C_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_phase3_2', ACTIVE_GRID_C_POWER);
      }

      if (result['POWER_METER_ACTIVE_POWER'] && result['POWER_METER_ACTIVE_POWER'].value != 'xxx' && this.hasCapability('measure_power.grid_active_power2')) {
        this.addCapability('measure_power.grid_active_power2');
        const POWER_METER_ACTIVE_POWER = Number(result['POWER_METER_ACTIVE_POWER'].value) * Math.pow(10, Number(result['POWER_METER_ACTIVE_POWER'].scale));
        this.setCapabilityValue('measure_power.grid_active_power2', POWER_METER_ACTIVE_POWER);
      }

      // if (result['GRID_EXPORTED_ENERGY'] && result['GRID_EXPORTED_ENERGY'].value != 'xxx' && this.hasCapability('meter_power.grid_import')) {
      //     this.addCapability('meter_power.grid_import');
      //     var GRID_EXPORTED_ENERGY = Number(result['GRID_EXPORTED_ENERGY'].value) * (Math.pow(10, Number(result['GRID_EXPORTED_ENERGY'].scale)));
      //     this.setCapabilityValue('meter_power.grid_import', GRID_EXPORTED_ENERGY);
      // }

      // if (result['GRID_ACCUMULATED_ENERGY'] && result['GRID_ACCUMULATED_ENERGY'].value != 'xxx' && this.hasCapability('meter_power.grid_export')) {
      //     this.addCapability('meter_power.grid_export');
      //     var GRID_ACCUMULATED_ENERGY = Number(result['GRID_ACCUMULATED_ENERGY'].value) * (Math.pow(10, Number(result['GRID_ACCUMULATED_ENERGY'].scale)));
      //     this.setCapabilityValue('meter_power.grid_export', GRID_ACCUMULATED_ENERGY);
      // }

      // if (result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'] && result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].value != 'xxx' && this.hasCapability('meter_power.today_batt_output')) {
      //     this.addCapability('meter_power.today_batt_output');
      //     var STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].value) * (Math.pow(10, Number(result['STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY'].scale)));
      //     this.setCapabilityValue('meter_power.today_batt_output', STORAGE_CURRENT_DAY_DISCHARGE_CAPACITY);
      // }

      // if (result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'] && result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value != 'xxx' && this.hasCapability('meter_power.today_batt_input')) {
      //     this.addCapability('meter_power.today_batt_input');
      //     var STORAGE_CURRENT_DAY_CHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value) * (Math.pow(10, Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].scale)));
      //     this.setCapabilityValue('meter_power.today_batt_input', STORAGE_CURRENT_DAY_CHARGE_CAPACITY);
      // }

      // if (result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'] && result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value != 'xxx' && this.hasCapability('meter_power.today_batt_input')) {
      //     this.addCapability('meter_power.today_batt_input');
      //     var STORAGE_CURRENT_DAY_CHARGE_CAPACITY = Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].value) * (Math.pow(10, Number(result['STORAGE_CURRENT_DAY_CHARGE_CAPACITY'].scale)));
      //     this.setCapabilityValue('meter_power.today_batt_input', STORAGE_CURRENT_DAY_CHARGE_CAPACITY);
      // }

      if (result['ACTIVE_POWER_CONTROL_MODE'] && result['ACTIVE_POWER_CONTROL_MODE'].value != 'xxx' && this.hasCapability('activepower_controlmode2')) {
        this.addCapability('activepower_controlmode2');
        const ACTIVE_POWER_CONTROL_MODE = result['ACTIVE_POWER_CONTROL_MODE'].value;
        this.setCapabilityValue('activepower_controlmode2', ACTIVE_POWER_CONTROL_MODE);
      }

      if (
        result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE']
        && result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE'].value != 'xxx'
        && this.hasCapability('storage_force_charge_discharge3')
      ) {
        this.addCapability('storage_force_charge_discharge3');
        const STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE = result['STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE'].value;
        this.setCapabilityValue('storage_force_charge_discharge3', STORAGE_FORCIBLE_CHARGE_DISCHARGE_WRITE);
      }

      if (
        result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU']
        && result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU'].value != 'xxx'
        && this.hasCapability('storage_excess_pv_energy_use_in_tou2')
      ) {
        this.addCapability('storage_excess_pv_energy_use_in_tou2');
        const STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU = result['STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU'].value;
        this.setCapabilityValue('storage_excess_pv_energy_use_in_tou2', STORAGE_EXCESS_PV_ENERGY_USE_IN_TOU);
      }

      if (
        result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE']
        && result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE'].value != 'xxx'
        && this.hasCapability('remote_charge_discharge_control_mode2')
      ) {
        this.addCapability('remote_charge_discharge_control_mode2');
        const REMOTE_CHARGE_DISCHARGE_CONTROL_MODE = result['REMOTE_CHARGE_DISCHARGE_CONTROL_MODE'].value;
        this.setCapabilityValue('remote_charge_discharge_control_mode2', REMOTE_CHARGE_DISCHARGE_CONTROL_MODE);
      }

      if (
        result['STORAGE_WORKING_MODE_SETTINGS']
        && result['STORAGE_WORKING_MODE_SETTINGS'].value != 'xxx'
        && this.hasCapability('storage_working_mode_settings2')
      ) {
        this.addCapability('storage_working_mode_settings2');
        const STORAGE_WORKING_MODE_SETTINGS = result['STORAGE_WORKING_MODE_SETTINGS'].value;
        this.setCapabilityValue('storage_working_mode_settings2', STORAGE_WORKING_MODE_SETTINGS);
      }

      if (
        result['STORAGE_MAXIMUM_CHARGE_POWER']
        && result['STORAGE_MAXIMUM_CHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.chargesetting2')
      ) {
        this.addCapability('measure_power.chargesetting2');
        const STORAGE_MAXIMUM_CHARGE_POWER = Number(result['STORAGE_MAXIMUM_CHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_MAXIMUM_CHARGE_POWER'].scale));
        this.setCapabilityValue('measure_power.chargesetting2', STORAGE_MAXIMUM_CHARGE_POWER);
      }

      if (
        result['STORAGE_MAXIMUM_DISCHARGE_POWER']
        && result['STORAGE_MAXIMUM_DISCHARGE_POWER'].value != 'xxx'
        && this.hasCapability('measure_power.dischargesetting2')
      ) {
        this.addCapability('measure_power.dischargesetting2');
        const STORAGE_MAXIMUM_DISCHARGE_POWER = Number(result['STORAGE_MAXIMUM_DISCHARGE_POWER'].value) * Math.pow(10, Number(result['STORAGE_MAXIMUM_DISCHARGE_POWER'].scale));
        this.setCapabilityValue('measure_power.dischargesetting2', STORAGE_MAXIMUM_DISCHARGE_POWER);
      }
    }
  }
}
