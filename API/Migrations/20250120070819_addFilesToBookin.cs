using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addFilesToBookin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isRequiredFiles",
                table: "Services",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "BookingId",
                table: "FileEntities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_BookingId",
                table: "FileEntities",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntities_Bookings_BookingId",
                table: "FileEntities",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntities_Bookings_BookingId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_BookingId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "isRequiredFiles",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "FileEntities");
        }
    }
}
