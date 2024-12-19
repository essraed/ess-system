using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FileEntities_CategoryId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_ServiceId",
                table: "FileEntities");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_CategoryId",
                table: "FileEntities",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_ServiceId",
                table: "FileEntities",
                column: "ServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FileEntities_CategoryId",
                table: "FileEntities");

            migrationBuilder.DropIndex(
                name: "IX_FileEntities_ServiceId",
                table: "FileEntities");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_CategoryId",
                table: "FileEntities",
                column: "CategoryId",
                unique: true,
                filter: "[CategoryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_FileEntities_ServiceId",
                table: "FileEntities",
                column: "ServiceId",
                unique: true,
                filter: "[ServiceId] IS NOT NULL");
        }
    }
}
