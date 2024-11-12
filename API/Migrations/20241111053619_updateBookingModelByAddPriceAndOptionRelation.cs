using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updateBookingModelByAddPriceAndOptionRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_AspNetUsers_BookingById",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_BookingById",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BookingById",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "ServiceVipName",
                table: "Services",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "BookingId",
                table: "ServiceOptions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Bookings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "Bookings",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServiceOptions_BookingId",
                table: "ServiceOptions",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceOptions_Bookings_BookingId",
                table: "ServiceOptions",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceOptions_Bookings_BookingId",
                table: "ServiceOptions");

            migrationBuilder.DropIndex(
                name: "IX_ServiceOptions_BookingId",
                table: "ServiceOptions");

            migrationBuilder.DropColumn(
                name: "ServiceVipName",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "ServiceOptions");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "BookingById",
                table: "Bookings",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_BookingById",
                table: "Bookings",
                column: "BookingById");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_AspNetUsers_BookingById",
                table: "Bookings",
                column: "BookingById",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
