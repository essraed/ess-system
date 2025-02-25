using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updateTheNationalityPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_NationalityId",
                table: "Bookings");

            migrationBuilder.AddColumn<decimal>(
                name: "MultiplePriceWithMonthForChild",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MultiplePriceWithTwoMonthForChild",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SinglePriceWithTwoMonthForChild",
                table: "Nationalities",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_NationalityId",
                table: "Bookings",
                column: "NationalityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_NationalityId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "MultiplePriceWithMonthForChild",
                table: "Nationalities");

            migrationBuilder.DropColumn(
                name: "MultiplePriceWithTwoMonthForChild",
                table: "Nationalities");

            migrationBuilder.DropColumn(
                name: "SinglePriceWithTwoMonthForChild",
                table: "Nationalities");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_NationalityId",
                table: "Bookings",
                column: "NationalityId",
                unique: true,
                filter: "[NationalityId] IS NOT NULL");
        }
    }
}
