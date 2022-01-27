const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle_boundary_watchlists', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    vehicle_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'vehicles',
        key: 'id'
      }
    },
    boundary_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'boundaries',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    ends_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehicle_boundary_watchlists',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "vehicle_boundary_watchlists_vehicle_id_index",
        using: "BTREE",
        fields: [
          { name: "vehicle_id" },
        ]
      },
      {
        name: "vehicle_boundary_watchlists_boundary_id_index",
        using: "BTREE",
        fields: [
          { name: "boundary_id" },
        ]
      },
    ]
  });
};
