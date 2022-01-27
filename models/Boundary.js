module.exports = (sequelize, DataTypes) => {
  const Boundary = sequelize.define(
    "Boundary",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.DOUBLE(14, 10),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE(14, 10),
        allowNull: true,
      },
      radius: {
        type: DataTypes.DOUBLE(14, 6),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "boundaries",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  Boundary.associate = (models) => {
    Boundary.hasMany(models.VehicleBoundaryEvent, {
      as: "vehicleBoundaryEvents",
      foreignKey: "boundary_id",
    });
  };
  return Boundary;
};
