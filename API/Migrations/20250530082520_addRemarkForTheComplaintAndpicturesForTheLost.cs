using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class addRemarkForTheComplaintAndpicturesForTheLost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LostId",
                table: "FileEntities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "Complaints",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_LostId",
                table: "FileEntities",
                column: "LostId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntities_Losts_LostId",
                table: "FileEntities",
                column: "LostId",
                principalTable: "Losts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntities_Losts_LostId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_LostId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "LostId",
                table: "FileEntities");

            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "Complaints");
        }
    }
}
