using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class updaterelationBetweenBookingAndOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceOptions_Bookings_BookingId",
                table: "ServiceOptions");

            migrationBuilder.DropIndex(
                name: "IX_ServiceOptions_BookingId",
                table: "ServiceOptions");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "ServiceOptions");

            migrationBuilder.AddColumn<Guid>(
                name: "ServiceOptionId",
                table: "Bookings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ServiceOptionId",
                table: "Bookings",
                column: "ServiceOptionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_ServiceOptions_ServiceOptionId",
                table: "Bookings",
                column: "ServiceOptionId",
                principalTable: "ServiceOptions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_ServiceOptions_ServiceOptionId",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ServiceOptionId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ServiceOptionId",
                table: "Bookings");

            migrationBuilder.AddColumn<Guid>(
                name: "BookingId",
                table: "ServiceOptions",
                type: "uniqueidentifier",
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
    }
}
