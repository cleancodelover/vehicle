module.exports = (sequelize, DataTypes) => {
  const VehicleTelemetry = sequelize.define(
    "VehicleTelemetry",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      vehicle_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        references: {
          model: "Vehicle",
          key: "id",
        },
      },
      battery_current: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      battery_voltage: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      external_powersource_voltage: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      channel_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      provider_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      engine_ignition_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      event_priority_enum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gnss_state_enum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      gnss_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      gsm_mnc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      gsm_signal_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ident: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      movement_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      peer: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      position_altitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      position_direction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      position_hdop: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      position_latitude: {
        type: DataTypes.DOUBLE(18, 10),
        allowNull: true,
      },
      position_longitude: {
        type: DataTypes.DOUBLE(18, 10),
        allowNull: true,
      },
      position_pdop: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      position_satellites: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      position_speed: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      position_valid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      protocol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      server_timestamp: {
        type: DataTypes.DOUBLE(18, 7),
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vehicle_mileage: {
        type: DataTypes.DOUBLE(18, 7),
        allowNull: true,
      },
      server_recorded_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      device_recorded_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "vehicle_telemetries",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "vehicle_telemetries_vehicle_id_index",
          using: "BTREE",
          fields: [{ name: "vehicle_id" }],
        },
        {
          name: "vehicle_telemetries_ident_index",
          using: "BTREE",
          fields: [{ name: "ident" }],
        },
      ],
    }
  );
  VehicleTelemetry.associate = (models) => {
    VehicleTelemetry.belongsTo(models.Vehicle, {
      as: "vehicle",
      foreignKey: "vehicle_id",
    });
    VehicleTelemetry.hasMany(models.VehicleBoundaryEvent, {
      as: "boundaryEvents",
      foreignKey: "vehicle_telemetry_id",
    });
  };
  return VehicleTelemetry;
};
