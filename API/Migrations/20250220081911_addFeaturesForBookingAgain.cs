using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addFeaturesForBookingAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Nationalities",
                newName: "SinglePriceWithTwoMonth");

            migrationBuilder.AddColumn<decimal>(
                name: "AdultPriceWithExpress",
                table: "Services",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ChildPriceWithExpress",
                table: "Services",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ChildPriceWithRegular",
                table: "Services",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExtentionPrice",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MultiplePriceWithMonth",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MultiplePriceWithTwoMonth",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SinglePriceWithMonth",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdultPriceWithExpress",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ChildPriceWithExpress",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ChildPriceWithRegular",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "ExtentionPrice",
                table: "Nationalities");

            migrationBuilder.DropColumn(
                name: "MultiplePriceWithMonth",
                table: "Nationalities");

            migrationBuilder.DropColumn(
                name: "MultiplePriceWithTwoMonth",
                table: "Nationalities");

            migrationBuilder.DropColumn(
                name: "SinglePriceWithMonth",
                table: "Nationalities");

            migrationBuilder.RenameColumn(
                name: "SinglePriceWithTwoMonth",
                table: "Nationalities",
                newName: "Price");
        }
    }
}
