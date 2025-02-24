using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addFeaturesForBookingAgain2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExtentionPrice",
                table: "Nationalities");

            migrationBuilder.RenameColumn(
                name: "ChildPriceWithRegular",
                table: "Services",
                newName: "RegularPrice");

            migrationBuilder.RenameColumn(
                name: "ChildPriceWithExpress",
                table: "Services",
                newName: "ExpressPrice");

            migrationBuilder.RenameColumn(
                name: "AdultPriceWithExpress",
                table: "Services",
                newName: "ChildPrice");

            migrationBuilder.AddColumn<int>(
                name: "ProcessTime",
                table: "Bookings",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProcessTime",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "RegularPrice",
                table: "Services",
                newName: "ChildPriceWithRegular");

            migrationBuilder.RenameColumn(
                name: "ExpressPrice",
                table: "Services",
                newName: "ChildPriceWithExpress");

            migrationBuilder.RenameColumn(
                name: "ChildPrice",
                table: "Services",
                newName: "AdultPriceWithExpress");

            migrationBuilder.AddColumn<decimal>(
                name: "ExtentionPrice",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
